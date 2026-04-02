<?php

namespace App\Admin\Controllers;

use App\Admin\Repositories\Userredpacket;
use Dcat\Admin\Form;
use Dcat\Admin\Grid;
use Dcat\Admin\Show;
use Dcat\Admin\Http\Controllers\AdminController;

class UserredpacketController extends AdminController
{
    protected $title = "Member Red Packet Claim List";
    /**
     * Make a grid builder.
     *
     * @return Grid
     */
    protected function grid()
    {
        return Grid::make(Userredpacket::with(['user_data']), function (Grid $grid) {
            $grid->model()->orderBy('id', 'desc');
            $grid->column('id','ID')->sortable();
            $grid->column('user_data.username','Username');
            $grid->column('redpacketfee','Red Packet Rate');
            $grid->column('money','Deposit Amount');
            $grid->column('redpacketmoney','Red Packet Amount');
            $grid->column('status','Status')->using([0 => 'Pending Claim',1 => 'Claimed']);;
            $grid->column('usetime','Claim Time');
            $grid->column('created_at');

            $grid->filter(function (Grid\Filter $filter) {
                $filter->equal('id');

            });
            $grid->actions(function (Grid\Displayers\Actions $actions) {
                $actions->disableDelete();
                $actions->disableEdit();
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
        return Show::make($id, new Userredpacket(), function (Show $show) {
            $show->field('id');
            $show->field('id');
            $show->field('uid');
            $show->field('redpacketid');
            $show->field('redpacketfee');
            $show->field('money');
            $show->field('redpacketmoney');
            $show->field('status');
            $show->field('usetime');
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
        return Form::make(new Userredpacket(), function (Form $form) {
            $form->display('id');
            $form->text('uid');
            $form->text('redpacketid');
            $form->text('redpacketfee');
            $form->text('money');
            $form->text('redpacketmoney');
            $form->text('status');
            $form->text('usetime');

            $form->display('created_at');
            $form->display('updated_at');
        });
    }
}
