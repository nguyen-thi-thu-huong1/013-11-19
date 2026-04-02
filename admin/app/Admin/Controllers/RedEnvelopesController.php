<?php

namespace App\Admin\Controllers;

use App\Admin\Repositories\RedEnvelopes;
use Dcat\Admin\Form;
use Dcat\Admin\Grid;
use Dcat\Admin\Show;
use Dcat\Admin\Http\Controllers\AdminController;

class RedEnvelopesController extends AdminController
{

    public $title = 'Red Packet Management';

    protected $state = [1 => 'Active',0 => 'Disabled'];
    /**
     * Make a grid builder.
     *
     * @return Grid
     */
    protected function grid()
    {

        return Grid::make(new RedEnvelopes(), function (Grid $grid) {
            $grid->column('id')->sortable();
            $grid->column('day_flow','Min Deposit Amount');
            $grid->column('flow_money','Max Deposit Amount');
            $grid->column('money','Red Packet Rate');
            $grid->column('recharge','Red Packet Count');
            $grid->column('start_time','Claim Start Time');
            $grid->column('end_time','Claim End Time');
            $grid->column('status')->using($this->state);
            $grid->column('created_at');

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
        return Show::make($id, new RedEnvelopes(), function (Show $show) {
            $show->field('id');
            $show->field('day_flow','Min Deposit Amount');
            $show->field('flow_money','Max Deposit Amount');
            $show->field('money','Red Packet Rate');
            $show->field('recharge','Red Packet Count');
            $show->field('recharge','Status');
        });
    }

    /**
     * Make a form builder.
     *
     * @return Form
     */
    protected function form()
    {
        return Form::make(new RedEnvelopes(), function (Form $form) {
            $form->display('id');
            $form->currency('day_flow','Min Deposit Amount')->symbol('￥');
            $form->currency('flow_money','Max Deposit Amount')->symbol('￥');
            $form->currency('money','Red Packet Rate')->symbol('%');
            $form->text('recharge','Red Packet Count');

            $form->radio('status','Status')->options([1 => 'Active',0 => 'Disabled'])->default(1);
            $form->datetimeRange('start_time', 'end_time', 'Activity Duration');

            $form->display('created_at');
            $form->display('updated_at');
        });
    }
}
