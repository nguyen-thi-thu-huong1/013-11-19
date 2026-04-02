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
    protected $title = 'Agent Commission Report';
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
            //$grid->column('Settlement Plan');
            $grid->column('child_count','Active Members')->display(function (){
                return $this->agentbetTimes();
            });
            $grid->column('bet_sum','Total Valid Bets')->display(function (){
                return $this->agentbetSum();
            });
            $grid->column('valid_bet_sum','Total Profit')->display(function (){
                return $this->agentvaildBetSum();
            });
            $grid->column('win_loss','Total Rebate Earned')->display(function (){
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
