<?php

namespace App\Admin\Controllers;

use App\Admin\Repositories\User;
use App\Models\AgentSettlement;
use Dcat\Admin\Form;
use Dcat\Admin\Grid;
use Dcat\Admin\Show;
use Dcat\Admin\Http\Controllers\AdminController;
use Illuminate\Support\Facades\Hash;
use App\Admin\Actions\Grid\User\Fanyong;

class AgentController extends AdminController
{
    protected $title = "Agent List";
    /**
     * Make a grid builder.
     *
     * @return Grid
     */
    protected function grid()
    {
        return Grid::make(new User(), function (Grid $grid) {
            $grid->model()->where('isagent', 1);
            $grid->model()->orderBy('id', 'desc');
            $grid->column('id')->sortable();
            $grid->column('username');
            // $grid->column('password');
            $grid->column('realname','Name');
            // $grid->column('commisssion','Commission');
            $grid->column('settlement_id','Settlement Plan')->display(function($settlement_id){
                $name = AgentSettlement::find($settlement_id)->name  ?? '';
                return $name;
            });

            $grid->column('balance','Balance');

        
            $grid->column('status','Status')->using([1 => 'Active',0 => 'Disabled']);
            $grid->column('created_at');
            // $grid->column('updated_at')->sortable();

            $grid->filter(function (Grid\Filter $filter) {
                $filter->equal('id');
                $filter->equal('username');

            });
            $grid->actions(function (Grid\Displayers\Actions $actions) {
                $actions->append(new Fanyong());
                $actions->disableDelete();
                $actions->disableView();
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
            $form->text('password','Password')->creationRules('required|min:6|max:16',['required' => 'Password is required','min' => 'Password must be at least 6 characters','max' => 'Password must be at most 16 characters']);
            $form->text('realname','Full Name')->rules('required',['required' => 'Full name is required']);
            // $form->hidden('vip');
            // $form->hidden('level');
            $form->hidden('paypwd');
            // $form->text('isonline');
            $form->radio('allowagent','Allow Sub-Agents')->options([1 => 'Yes',0 => 'No'])->default(0);
            // $form->text('balance');
            // $form->text('mbalance');
            $form->text('phone','Phone Number');
            $form->text('mail','Email');
            $form->hidden('fanshuifee');
            // $form->text('paysum');
            $form->radio('status','Status')->options([1 => 'Active',0 => 'Disabled'])->default(1);
            // $form->text('isdel')->options([1 => 'Yes',0 => 'No'])->default(0);
            // $form->text('isblack')->options([1 => 'Yes',0 => 'No'])->default(0);
            // $form->text('lastip');
            // $form->text('logintime');
            // $form->text('sourceurl');
            $form->hidden('isagent')->default(1);
            $settlements = AgentSettlement::all();
            $options = [];
            foreach ($settlements as $v) {
                $options[$v->id] = $v->name;
            }
            $form->select('settlement_id','Settlement Plan')->options($options)->required();



            $form->saving(function (Form $form) {
                // Check if this is a create operation
                //echo $form->settlement_id;
                $agent = AgentSettlement::where('id',$form->settlement_id)->first();
                //print_r($agent);
                $form->fanshuifee =  $agent->member_fs ;
                //exit;
                if ($form->isCreating()) {
                    $form->password = Hash::make($form->password);
                    $form->paypwd = $form->paypwd ? Hash::make($form->paypwd) : '';
                } else {
                    $form->password = $form->password ? Hash::make($form->password) : $form->model()->password;
                    $form->paypwd = ($form->paypwd && $form->model()->paypwd != $form->paypwd) ? Hash::make($form->paypwd) : $form->model()->paypwd;
                }

                $form->isagent = 1;

            });

            $form->display('created_at');
            $form->display('updated_at');
        });
    }
}
