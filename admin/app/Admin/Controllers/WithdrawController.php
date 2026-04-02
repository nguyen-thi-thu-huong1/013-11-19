<?php

namespace App\Admin\Controllers;

use App\Admin\Repositories\Withdraw;
use Dcat\Admin\Form;
use Dcat\Admin\Grid;
use Dcat\Admin\Show;
use Dcat\Admin\Http\Controllers\AdminController;
use App\Admin\Actions\Grid\Withdraw\Pass;
use App\Admin\Actions\Grid\Withdraw\Refuse;

class WithdrawController extends AdminController
{
    protected $title = 'Withdrawal Review';
    /**
     * Make a grid builder.
     *
     * @return Grid
     */
    protected function grid()
    {
        return Grid::make(new Withdraw(with(['card_data','user_data'])), function (Grid $grid) {
            $grid->model()->orderBy('id', 'desc');
            $grid->column('id')->sortable();
            //$grid->column('order_no');
            $grid->column('user_data.username','Username');
            $grid->column('card_data.bank_owner','Name / Protocol');
            
            //$grid->column('card_data.bank_no','Withdrawal Info');
            
            
            $grid->column('amount','Withdrawal Amount');
            $grid->column('type','Withdrawal Method')->using([0 => 'Not Recorded',1 => 'Bank Card',2 => 'USDT-TRC20',3 => 'USDT-ERC20']);
            $grid->column('usdt_rate','Exchange Rate');
            $grid->column('cash_fee');
            $grid->column('real_money','Actual Withdrawal');
            
            $grid->column('state')->using([1 => 'Pending',2 => 'Completed',3 => 'Rejected',4 => 'Error']);
            $grid->column('created_at');

            $grid->disableCreateButton();

            $grid->filter(function (Grid\Filter $filter) {
                $filter->equal('id');
                $filter->equal('user_data.username','Username');
                $filter->between('created_at', 'Date')->date();
            });
            $grid->actions(function (Grid\Displayers\Actions $actions) {
                $actions->disableEdit();
                $actions->disableDelete();
                if ($actions->row->state == 1 || $actions->row->state == 4) {
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
        return Show::make($id, new Withdraw(with(['card_data','user_data'])), function (Show $show) {
            $show->field('id');
            $show->field('order_no');
            $show->field('card_id');
            $show->field('user_data.username','Username');
            $show->field('card_data.bank_owner','Name / Protocol');
            $show->field('type','Withdrawal Method')->using([0 => 'Not Recorded',1 => 'Bank Card',2 => 'USDT-TRC20']);
            $show->field('card_data.bank_no','Card No. / USDT');
            $show->field('amount');
            $show->field('cash_fee');
            $show->field('real_money','Actual Withdrawal');
            
            $show->field('info');
            $show->field('state');
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
        return Form::make(new Withdraw(), function (Form $form) {
            $form->display('id');
            $form->text('order_no');
            $form->text('card_id');
            $form->text('user_id');
            $form->text('amount');
            $form->text('cash_fee');
            $form->text('real_money');
            $form->text('info');
            $form->text('state');

            $form->display('created_at');
            $form->display('updated_at');
        });
    }
}
