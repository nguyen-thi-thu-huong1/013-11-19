<?php

namespace App\Admin\Controllers;

use App\Admin\Repositories\User;
use Dcat\Admin\Form;
use Dcat\Admin\Grid;
use Dcat\Admin\Show;
use Dcat\Admin\Http\Controllers\AdminController;
use Illuminate\Support\Facades\Hash;

class BetReportController extends AdminController
{
    protected $title = 'Betting Statistics';
    /**
     * Make a grid builder.
     *
     * @return Grid
     */
    protected function grid()
    {
        return Grid::make(new User(), function (Grid $grid) {
            $grid->column('id')->sortable();
            $grid->column('username');
            $grid->column('bet_times','Bet Count')->display(function (){
                return $this->betTimes();
            });
            $grid->column('bet_sum','Total Bet Amount')->display(function (){
                return $this->betSum();
            });
            $grid->column('valid_bet_sum','Total Valid Bet Amount')->display(function (){
                return $this->vaildBetSum();
            });
            $grid->column('win_loss','Total Win/Loss Amount')->display(function (){
                return $this->winLoss();
            });
        
            $grid->filter(function (Grid\Filter $filter) {
                $filter->equal('id');
        
            });
        });
    }
}
