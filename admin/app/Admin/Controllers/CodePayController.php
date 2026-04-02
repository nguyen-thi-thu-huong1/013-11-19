<?php

namespace App\Admin\Controllers;

use App\Admin\Repositories\CodePay;
use Dcat\Admin\Form;
use Dcat\Admin\Grid;
use Dcat\Admin\Show;
use Dcat\Admin\Http\Controllers\AdminController;

class CodePayController extends AdminController
{
    protected $state = [1 => 'Active',0 => 'Disabled'];
    /**
     * Make a grid builder.
     *
     * @return Grid
     */
    protected function grid()
    {
        return Grid::make(new CodePay(), function (Grid $grid) {
            $grid->column('id')->sortable();
            $grid->column('content','Title');
            $grid->column('mch_id','Account');
            $grid->column('min_price','Minimum Deposit Amount');
            $grid->column('max_price','Maximum Deposit Amount');
            $grid->column('status','Status')->using($this->state);
            $grid->column('created_at');
            // $grid->column('updated_at')->sortable();

            $grid->filter(function (Grid\Filter $filter) {
                $filter->equal('id');

            });
            $grid->actions(function (Grid\Displayers\Actions $actions) {
                $actions->disableView();
                $actions->disableDelete();
              
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
        return Show::make($id, new CodePay(), function (Show $show) {
            $show->field('id');
            $show->field('payimg')->image();
            $show->field('content');
        });
    }

    /**
     * Make a form builder.
     *
     * @return Form
     */
    protected function form()
    {
        return Form::make(new CodePay(), function (Form $form) {
            $form->display('id');
             $form->text('content','Title')->required();
            $form->text('mch_id','Account')->required();
            $form->decimal('min_price','Minimum Deposit Amount')->required();
            $form->decimal('max_price','Maximum Deposit Amount')->required();
            $form->image('payimg','Payment QR Code')->uniqueName()->required();
            $form->radio('status','Status')->options([1 => 'Active',0 => 'Disabled'])->default(1);
            $form->display('created_at');
            $form->display('updated_at');
        });
    }
}
