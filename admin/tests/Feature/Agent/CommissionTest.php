<?php

namespace Tests\Feature\Agent;

use App\Models\User;
use App\Models\TransferLog;
use App\Models\SystemConfig;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CommissionTest extends TestCase
{
    use RefreshDatabase;

    protected $agent;
    protected $childUser;

    protected function setUp(): void
    {
        parent::setUp();
        
        // 创建系统配置
        SystemConfig::create([
            'key' => 'settlement',
            'value' => '7',
            'description' => '结算周期(天)'
        ]);

        // 创建代理用户
        $this->agent = User::factory()->create([
            'isagent' => 1,
            'balance' => 1000
        ]);

        // 创建下级用户
        $this->childUser = User::factory()->create([
            'pid' => $this->agent->id,
            'isagent' => 0,
            'balance' => 500
        ]);

        // 创建转账记录
        TransferLog::create([
            'user_id' => $this->agent->id,
            'transfer_type' => 20,
            'money' => 100,
            'state' => 2
        ]);
    }

    /** @test */
    public function it_can_display_commission_page()
    {
        $response = $this->actingAs($this->agent)
            ->get(route('agent.commission'));

        $response->assertStatus(200)
            ->assertViewIs('agent.report.commission')
            ->assertViewHas('statistics');
    }

    /** @test */
    public function it_can_filter_commission_by_date_range()
    {
        $response = $this->actingAs($this->agent)
            ->get(route('agent.commission', [
                'start' => now()->subDays(7)->format('Y-m-d'),
                'end' => now()->format('Y-m-d')
            ]));

        $response->assertStatus(200)
            ->assertViewHas('statistics');
    }

    /** @test */
    public function it_can_filter_commission_by_username()
    {
        $response = $this->actingAs($this->agent)
            ->get(route('agent.commission', [
                'username' => $this->childUser->username
            ]));

        $response->assertStatus(200)
            ->assertViewHas('statistics');
    }

    /** @test */
    public function it_validates_date_range()
    {
        $response = $this->actingAs($this->agent)
            ->get(route('agent.commission', [
                'start' => now()->format('Y-m-d'),
                'end' => now()->subDays(7)->format('Y-m-d')
            ]));

        $response->assertSessionHasErrors('end');
    }

    /** @test */
    public function it_validates_username_exists()
    {
        $response = $this->actingAs($this->agent)
            ->get(route('agent.commission', [
                'username' => 'nonexistent_user'
            ]));

        $response->assertSessionHasErrors('username');
    }
} 