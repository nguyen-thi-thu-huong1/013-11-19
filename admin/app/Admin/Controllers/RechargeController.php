<?php

namespace App\Admin\Controllers;

use App\Admin\Repositories\Recharge;
use Dcat\Admin\Form;
use Dcat\Admin\Grid;
use Dcat\Admin\Show;
use Dcat\Admin\Http\Controllers\AdminController;
use App\Admin\Actions\Grid\Recharge\Pass;
use App\Admin\Actions\Grid\Recharge\Refuse;

class RechargeController extends AdminController
{

    protected $pay_way = [1 => 'Bank Transfer', 2 => 'ZGPAY Payment', 3 => 'Alipay QR Payment', 4 => 'WeChat QR Payment', 5 => 'USDT-TRC20',6 => 'USDT-ERC20', 10 => 'Deposit Bonus',11 => 'Agent Deposit'];
    /**
     * Make a grid builder.
     *
     * @return Grid
     */
    protected function grid()
    {
        return Grid::make(Recharge::with(['user_data']), function (Grid $grid) {
            $grid->model()->orderBy('id', 'desc');
            $grid->column('id')->sortable();
            //$grid->column('order_no');
            //$grid->column('out_trade_no');
            $grid->column('user_data.username', 'Username')->view('admin.field.user_username');
            //$grid->column('amount');
            
            $grid->column('amount','Deposit Amount');
            $grid->column('pay_way')->using($this->pay_way);
            //$grid->column('usdt_type','Protocol Type');
            $grid->column('usdt_rate','Exchange Rate');
            $grid->column('real_money','Actual Payment');

            
            
            //$grid->column('bank_no');
            $grid->column('state')->using([1 => 'Pending', 2 => 'Completed', 3 => 'Rejected']);
            $grid->column('created_at');

            // Name search
            // $grid->quickSearch('user_data.username');


            $grid->filter(function (Grid\Filter $filter) {
                $filter->equal('id');
                $filter->equal('user_data.username', "Username");
                $filter->between('created_at', 'Date')->date();
                $filter->equal('pay_way')->select($this->pay_way);
            });
            $grid->disableCreateButton();
            $grid->actions(function (Grid\Displayers\Actions $actions) {
                $actions->disableEdit();
                $actions->disableDelete();
                if ($actions->row->state == 1) {
                    $actions->append(new Pass());
                    $actions->append(new Refuse());
                }
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
        return Show::make($id, new Recharge(), function (Show $show) {
            $show->field('id');
            $show->field('order_no');
            $show->field('out_trade_no');
            $show->field('user_id');
            $show->field('amount');
            $show->field('cash_fee');
            $show->field('real_money');
            $show->field('pay_way')->using($this->pay_way);
            
            $show->field('bank_no','Bank Card Number');
            $show->field('bank');
            $show->field('bank_address');
            $show->field('bank_owner','Name / USDT Address');
            $show->field('info');
            $show->field('state')->using([1 => 'Pending', 2 => 'Completed', 3 => 'Rejected']);
            $show->field('created_at');

            $show->panel()
                ->tools(function ($tools) {
                    $tools->disableEdit();
                });
        });
    }

    /**
     * Make a form builder.
     *
     * @return Form
     */
    protected function form()
    {
        return Form::make(new Recharge(), function (Form $form) {
            $form->display('id');
            $form->text('order_no');
            $form->text('out_trade_no');
            $form->text('user_id');
            $form->text('amount');
            $form->text('cash_fee');
            $form->text('real_money');
            $form->text('pay_way');
            $form->text('bank');
            $form->text('bank_no');
            $form->text('bank_address');
            $form->text('bank_owner');
            $form->text('info');
            $form->text('state');

            $form->display('created_at');
            $form->display('updated_at');
        });
    }
}
