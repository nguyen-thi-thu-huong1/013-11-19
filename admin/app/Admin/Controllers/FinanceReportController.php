<?php

namespace App\Admin\Controllers;

use App\Admin\Repositories\User;
use App\User as AppUser;
use Dcat\Admin\Form;
use Dcat\Admin\Grid;
use Dcat\Admin\Show;
use Dcat\Admin\Http\Controllers\AdminController;
use Illuminate\Support\Facades\Hash;

class FinanceReportController extends AdminController
{
    /**
     * Make a grid builder.
     *
     * @return Grid
     */
    protected function grid()
    {
        return Grid::make(new User(), function (Grid $grid) {
            $grid->model()->orderBy('id', 'desc');
            $grid->column('id')->sortable();
            $grid->column('isagent','Agent')->using([1 => 'Yes',0 => 'No']);
            $grid->column('username');
            $grid->column('recharge_times','Deposit Count')->display(function (){
                return $this->agentrechargeTimes();
            });
            $grid->column('withdraw_times','Withdrawal Count')->display(function (){
                return $this->agentwithdrawTimes();
            });
            $grid->column('recharge_sum','Total Deposits')->display(function (){
                return $this->agentrechargeSum();
            });
            $grid->column('withdraw_sum','Total Withdrawals')->display(function (){
                return $this->agentwithdrawSum();
            });
            $grid->column('fanshui_sum','Total Cashback')->display(function (){
                return AppUser::totalfanhui($this->id);
            });
            $grid->column('profit','Total Profit/Loss')->display(function (){
                return $this->agentrechargeSum() - $this->agentwithdrawSum();
            });
            $grid->disableActions();
            $grid->disableCreateButton();
            // Name search
            $grid->quickSearch('user_data.username');

            $grid->filter(function (Grid\Filter $filter) {
                $filter->equal('id');
                $filter->equal('user_data.username');
                $filter->between('created_at', 'Date')->date();
                $filter->between('balance', 'Amount');
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
        return Show::make($id, new User(), function (Show $show) {
            $show->field('id');
            $show->field('fid');
            $show->field('username');
            // $show->field('password');
            $show->field('realname');
            $show->field('vip');
            $show->field('level');
            // $show->field('paypwd');
            $show->field('isonline')->using([1 => 'Online',0 => 'Offline']);
            $show->field('isagent')->using([1 => 'Yes',0 => 'No']);
            $show->field('allowagent')->using([1 => 'Yes',0 => 'No']);
            $show->field('balance');
            $show->field('mbalance');
            $show->field('phone');
            $show->field('mail');
            $show->field('paysum');
            $show->field('status')->using([1 => 'Active',0 => 'Disabled']);
            $show->field('isdel')->using([1 => 'Yes',0 => 'No']);
            $show->field('isblack')->using([1 => 'Yes',0 => 'No']);
            $show->field('lastip');
            $show->logintime()->as(function ($logintime) {
                return date('Y-m-d H:i:s',$logintime);
            });
            $show->field('sourceurl');
            $show->field('loginsum');
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
        return Form::make(new User(), function (Form $form) {
            $form->display('id');
            // $form->text('fid');
            if ($form->isCreating()) {
                $form->text('username')->rules('required|unique:users',['required' => 'Username is required','unique' => 'Username already exists']);
            } else {
                $form->display('username');
            }
            $form->text('password','Password')->creationRules('required,min:6,max:16',['required' => 'Password is required','min' => 'Password must be at least 6 characters','max' => 'Password must be at most 16 characters']);
            $form->text('realname')->rules('required',['required' => 'Full name is required']);
            $form->text('vip');
            $form->text('level');
            $form->text('paypwd');
            // $form->text('isonline');
            $form->radio('isagent')->options([1 => 'Yes',0 => 'No'])->default(0);
            $form->radio('allowagent')->options([1 => 'Yes',0 => 'No'])->default(0);
            $form->text('balance');
            $form->text('mbalance');
            $form->text('phone');
            $form->text('mail');
            // $form->text('paysum');
            $form->radio('status')->options([1 => 'Active',0 => 'Disabled'])->default(1);
            $form->text('isdel')->options([1 => 'Yes',0 => 'No'])->default(0);
            $form->text('isblack')->options([1 => 'Yes',0 => 'No'])->default(0);
            // $form->text('lastip');
            // $form->text('logintime');
            $form->text('sourceurl');
            // $form->text('loginsum');

            $form->saving(function (Form $form) {
                // Check if this is a create operation
                if ($form->isCreating()) {
                    $form->password = Hash::make($form->password);
                    $form->paypwd = $form->paypwd ? Hash::make($form->paypwd) : '';
                } else {
                    $form->password = $form->password ? Hash::make($form->password) : $form->model()->password;
                    $form->paypwd = ($form->paypwd && $form->model()->paypwd != $form->paypwd) ? Hash::make($form->paypwd) : $form->model()->paypwd;
                }
            });

            $form->display('created_at');
            $form->display('updated_at');
        });
    }
}
