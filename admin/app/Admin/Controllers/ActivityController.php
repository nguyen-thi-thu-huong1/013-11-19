<?php

namespace App\Admin\Controllers;

use App\Admin\Repositories\Activity;
use Dcat\Admin\Form;
use Dcat\Admin\Grid;
use Dcat\Admin\Show;
use Dcat\Admin\Http\Controllers\AdminController;

class ActivityController extends AdminController
{

    protected $type = [1 => 'Deposit Bonus'];
    /**
     * Make a grid builder.
     *
     * @return Grid
     */
    protected function grid()
    {
        return Grid::make(Activity::with(['type_data']), function (Grid $grid) {
            $grid->model()->orderBy('id', 'desc');
            $grid->column('id')->sortable();
            
            $grid->column('type_data.name','Activity Type');
            $grid->column('title');
            $grid->column('entitle');
            //$grid->column('content');
            $grid->column('apply_count');
            //$grid->column('banner');
            $grid->column('can_apply')->using([1 => 'Applicable',0 => 'Not Applicable']);
            $grid->column('state')->using([1 => 'Active',0 => 'Disabled']);
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
        return Show::make($id, new Activity(), function (Show $show) {
            $show->field('id');
            $show->field('type');
            $show->field('title');
            $show->field('entitle');
            $show->field('content');
            $show->field('apply_count');
            $show->field('banner')->image();
            $show->field('can_apply');
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
        return Form::make(new Activity(), function (Form $form) {
            $form->display('id');
            
            $settlements = \App\Models\ActivityType::where('state', 1)->get();
            $options = [];
            foreach ($settlements as $k => $v) {
                $options[$v->id] = $v->name;
            }
            
            $form->select('type')->options($options)->required();
            $form->text('title')->required();
            $form->text('entitle')->required();
            $form->editor('content')->required();
            $form->editor('encontent')->required();
            $form->editor('memo','Activity Terms & Rules')->required();
            $form->editor('enmemo','Activity Terms & Rules')->required();
            $form->number('apply_count');
            $form->image('banner')->uniqueName()->retainable();
            $form->radio('can_apply')->options([1 => 'Applicable',0 => 'Not Applicable'])->default(1);
            $form->radio('state')->options([1 => 'Active',0 => 'Disabled'])->default(1);

            $form->display('created_at');
            $form->display('updated_at');
        });
    }
}
