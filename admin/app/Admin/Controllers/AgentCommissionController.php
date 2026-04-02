<?php

namespace App\Admin\Controllers;

use App\Admin\Repositories\User;
use Dcat\Admin\Form;
use Dcat\Admin\Grid;
use Dcat\Admin\Show;
use Dcat\Admin\Http\Controllers\AdminController;
use Illuminate\Support\Facades\Hash;
use App\Admin\Actions\Grid\User\Fanyong;
use App\Admin\Tools\AgentFanyong;


class AgentCommissionController extends AdminController
{
    protected $title = '代理佣金报表';
    /**
     * Make a grid builder.
     *
     * @return Grid
     */
    protected function grid()
    {
        return Grid::make(new User(), function (Grid $grid) {
            $grid->model()->where('isagent',1);
            // $grid->column('id')->sortable();
            $grid->column('username');
            //$grid->column('结算方案');
            $grid->column('child_count','有效会员数')->display(function (){
                return $this->agentbetTimes();
            });
            $grid->column('bet_sum','总有效投注')->display(function (){
                return $this->agentbetSum();
            });
            $grid->column('valid_bet_sum','总盈利')->display(function (){
                return $this->agentvaildBetSum();
            });
            $grid->column('win_loss','总获返利')->display(function (){
                return $this->agentwinLoss();
            });
            // $grid->disableActions();
            $grid->actions(function (Grid\Displayers\Actions $actions) {
                $actions->append(new Fanyong());
                $actions->disableDelete();
                $actions->disableView();
                $actions->disableEdit();
            });
            $grid->disableCreateButton();
            $grid->filter(function (Grid\Filter $filter) {
                $filter->equal('id');
                $filter->equal('username');
            });
            $grid->tools(new AgentFanyong());
        });
    }
    

}
