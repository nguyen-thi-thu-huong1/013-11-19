<?php

namespace App\Admin\Controllers;

use App\Admin\Repositories\UserVip;
use Dcat\Admin\Form;
use Dcat\Admin\Grid;
use Dcat\Admin\Show;
use Dcat\Admin\Http\Controllers\AdminController;

class UserVipController extends AdminController
{
    /**
     * Make a grid builder.
     *
     * @return Grid
     */
    protected function grid()
    {
        return Grid::make(new UserVip(), function (Grid $grid) {
            $grid->column('id')->sortable();
            $grid->column('vipname');

            //$grid->column('viptype');
            $grid->column('recharge','充值累计');
            $grid->column('flow','流水累计');
/*
            $grid->column('vrbetfee','Vebet返水(%)');
            $grid->column('ldfee','雷火返水(%)');*/
            $grid->column('realperson');
             $grid->column('electron');
            $grid->column('joker');
            $grid->column('sport');
            // $grid->column('fish');
            $grid->column('lottery');
            $grid->column('e_sport');
            $grid->column('status')->using([1 => '正常',0 => '禁用']);
            $grid->column('vippic','对应等级图片');
            $grid->column('created_at');
            // $grid->column('updated_at')->sortable();

            $grid->filter(function (Grid\Filter $filter) {
                $filter->equal('id');

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
        // return Show::make($id, new UserVip(), function (Show $show) {
        //     $show->field('id');
        //     $show->field('vipname');
        //     $show->field('viptype');
        //     $show->field('realperson');
        //     $show->field('electron');
        //     $show->field('chessandcard');
        //     $show->field('sports');
        //     $show->field('fish');
        //     $show->field('lottery');
        //     $show->field('lottery6');
        //     $show->field('status');
        //     $show->field('exp');
        //     $show->field('isdefault');
        //     $show->field('isdel');
        //     $show->field('created_at');
        //     $show->field('updated_at');
        // });
    }

    /**
     * Make a form builder.
     *
     * @return Form
     */
    protected function form()
    {
        return Form::make(new UserVip(), function (Form $form) {
            $form->display('id');
            $form->text('vipname')->required();
            $form->hidden('viptype')->default(1);
            $form->decimal('recharge','充值累计');
            $form->decimal('flow','流水累计');
            $form->decimal('electron');
            $form->decimal('realperson');
            $form->decimal('joker');
            $form->decimal('sport');
            // $form->decimal('fish');
            $form->decimal('lottery');
            $form->decimal('e_sport');
            $form->radio('status')->options([1 => '可用',0 => '禁用'])->default(1);
            //$form->number('exp');
            $form->radio('is_default')->options([1 => '是',0 => '否'])->default(0);
            $form->text('vippic');
            $form->display('created_at');
            $form->display('updated_at');
        });
    }
}
