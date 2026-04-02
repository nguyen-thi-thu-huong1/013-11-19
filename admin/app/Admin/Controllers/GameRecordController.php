<?php

namespace App\Admin\Controllers;

use App\Admin\Repositories\GameRecord;
use App\Models\GameRecord as ModelsGameRecord;
use Dcat\Admin\Form;
use Dcat\Admin\Grid;
use Dcat\Admin\Show;
use App\Services\TgService;
use Dcat\Admin\Http\Controllers\AdminController;

class GameRecordController extends AdminController
{

    protected $status = [1 => 'Settled',2 => 'Unsettled',0 => 'Invalid Bet'];

    /**
     * Make a grid builder.
     *
     * @return Grid
     */
    protected function grid()
    {
        return Grid::make(new GameRecord(), function (Grid $grid) {
            $grid->model()->orderBy('id', 'desc');
            $grid->column('username','Username');
            $grid->column('bet_id');
            $grid->column('bet_time');
/*            $grid->column('platform_type')->display(function ($platform_type){
                return  $platform_type ;//  $this->gamelist['ag'];
            });*/
            //$grid->column('game_type');
            $tg = New TgService;
            $gamelist =$tg->getallgamename();
          
            $grid->column('platform_type')->using($gamelist);
            $grid->column('bet_amount','Bet Amount');
            $grid->column('win_loss');
            $grid->column('is_back')->using([1 => 'Cashback Applied',0 => 'No Cashback']);
            $grid->column('status')->using($this->status);
            $grid->column('created_at');
            // $grid->column('updated_at')->sortable();

            $grid->disableActions();
            $grid->disableCreateButton();

            $grid->filter(function (Grid\Filter $filter) {
                            $tg = New TgService;
            $gamelist =$tg->getallgamename();
                $filter->equal('id');
                $filter->equal('username');
                $filter->equal('platform_type')->select($gamelist);
                $filter->between('bet_time', 'Date')->date();
            });
            $grid->footer(function ($collection) use ($grid) {
                $query = ModelsGameRecord::query();
            
                // Iterate over grid filter where conditions
                $grid->model()->getQueries()->unique()->each(function ($value) use (&$query) {
                    if (in_array($value['method'], ['paginate', 'get', 'orderBy', 'orderByDesc'], true)) {
                        return;
                    }
            
                    $query = call_user_func_array([$query, $value['method']], $value['arguments'] ?? []);
                });
            
                // Fetch summary data
                $data = $query->sum('valid_amount');
                // dd($data);
            
                return "<div style='padding: 10px;'>Total Revenue: $data</div>";
            });

            $grid->footer(function ($collection) use ($grid) {
                // Current page totals
                $valid_amount = $collection->sum('valid_amount');
                $str = "<div class='pull-right'>";
                $str .= "Page Valid Bets Total:<span style='color:red;'>".$valid_amount."</span>";
                $win_loss = $collection->sum('win_loss');
                $str .= "&nbsp;&nbsp;&nbsp;Page Win/Loss Total:<span style='color:red;'>".$win_loss."</span>";
                $str .= "</div><br>";
                // All records totals
                $query = ModelsGameRecord::query();
            
                // Iterate over grid filter where conditions
                $grid->model()->getQueries()->unique()->each(function ($value) use (&$query) {
                    if (in_array($value['method'], ['paginate', 'get', 'orderBy', 'orderByDesc'], true)) {
                        return;
                    }
                    $query = call_user_func_array([$query, $value['method']], $value['arguments'] ?? []);
                });
            
                // Fetch summary data
                $valid_amount_sum = $query->sum('valid_amount');
                $win_loss_sum = $query->sum('win_loss');
                $str .= "<div class='pull-right'>";
                $str .= "Valid Bets Total:<span style='color:red;'>".$valid_amount_sum."</span>";
                $str .= "&nbsp;&nbsp;&nbsp;Win/Loss Total:<span style='color:red;'>".$win_loss_sum."</span>";
                $str .= "</div>";
                return $str;
            });
        });
    }

    /**
     * Make a show builder.
     *
     * @param mixed $id
     *
     * @return Show
     */
    protected function detail($id)
    {
        return Show::make($id, new GameRecord(), function (Show $show) {
            $show->field('id');
            $show->field('user_id');
            $show->field('bet_id');
            $show->field('bet_time');
            $show->field('platform_type');
            $show->field('game_type');
            $show->field('bet_amount');
            $show->field('valid_amount');
            $show->field('win_loss');
            $show->field('is_back');
            $show->field('status');
            $show->field('created_at');
            $show->field('updated_at');
        });
    }

    /**
     * Make a form builder.
     *
     * @return Form
     */
    protected function form()
    {
        return Form::make(new GameRecord(), function (Form $form) {
            $form->display('id');
            $form->text('user_id');
            $form->text('bet_id');
            $form->text('bet_time');
            $form->text('platform_type');
            $form->text('game_type');
            $form->text('bet_amount');
            $form->text('valid_amount');
            $form->text('win_loss');
            $form->text('is_back');
            $form->text('status');

            $form->display('created_at');
            $form->display('updated_at');
        });
    }
}
