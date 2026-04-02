<?php

namespace App\Admin\Controllers;

use App\Admin\Repositories\User;
use App\Models\UserVip;
use Dcat\Admin\Form;
use Dcat\Admin\Grid;
use Dcat\Admin\Show;
use Illuminate\Support\Facades\Hash;
use Dcat\Admin\Http\Controllers\AdminController;

use App\Admin\Actions\Grid\User\Balance;
use App\Admin\Actions\Grid\User\BackBalance;
use App\Admin\Renderable\UserBalance;
use Dcat\Admin\Widgets\Card as WidgetsCard;
use App\Services\TgService;

class UserController extends AdminController
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
            //$grid->column('pid');
            $grid->column('username')->view('admin.field.user_username');
            // $grid->column('password');
            $grid->column('realname');
            $grid->column('vip', 'Level')->display(function ($vip) {
                $vipinfo = UserVip::find($vip);
                return ($vipinfo) ? $vipinfo->vipname : 'Registered Member';
            });
            //$grid->column('level');
            // $grid->column('paypwd');
            // $grid->column('isonline');
            $grid->column('isagent');
            $grid->column('isagent')->using([1 => 'Yes', 0 => 'No']);
            //$grid->column('allowagent');
            //$grid->column('reg_ip','Registration IP');
            $grid->column('balance');
            $grid->column('mbalance');
            // $grid->column('phone');
            // $grid->column('mail');
            $grid->column('paysum');
            $grid->column('status')->using([1 => 'Active', 0 => 'Disabled']);
            $grid->column('wallet_balance', 'Game Balance')
                ->display('API Balance') // Set button label
                ->modal(function ($modal) {
                    // Set modal title
                    $modal->title('Game Balance');
                    $res = UserBalance::make(['id' => $this->username]);
                    return $res;
                });

            // $grid->column('status');
            // $grid->column('isdel');
            // $grid->column('isblack');
            $grid->column('lastip')->display(function (){
                return $this->lastip.'/'.$this->last_login_ip_address;
            });
            // $grid->column('logintime');
            // $grid->column('sourceurl');
            // $grid->column('loginsum');
            $grid->column('created_at');
            // $grid->column('updated_at')->sortable();

            // Button filters
            // $grid->selector(function (Grid\Tools\Selector $selector) {
            //     $selector->select('isagent', 'Agent Member', [
            //         0 => 'Non-Agent Member',
            //         1 => 'Agent Member',
            //     ]);
            //     $selector->select('isonline', 'Online Status', [
            //         0 => 'Offline',
            //         1 => 'Online',
            //     ]);
            // });

            $grid->actions(function (Grid\Displayers\Actions $actions) {
                // Append an action
                $actions->append(new Balance());
                $actions->append(new BackBalance());
            });

            $grid->filter(function (Grid\Filter $filter) {
                $filter->equal('id');
                $filter->equal('username');
                $filter->equal('isagent', 'Agent Member')->select([
                    0 => 'Non-Agent Member',
                    1 => 'Agent Member',
                ]);
                $filter->equal('isonline', 'Online Status')->select([
                    0 => 'Offline',
                    1 => 'Online',
                ]);
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
            $show->field('isonline')->using([1 => 'Online', 0 => 'Offline']);
            $show->field('isagent')->using([1 => 'Yes', 0 => 'No']);
            $show->field('allowagent')->using([1 => 'Yes', 0 => 'No']);
            $show->field('balance');
            $show->field('mbalance');
            $show->field('phone');
            $show->field('mail');
            $show->field('paysum');
            $show->field('status')->using([1 => 'Active', 0 => 'Disabled']);
            $show->field('isdel')->using([1 => 'Yes', 0 => 'No']);
            $show->field('isblack')->using([1 => 'Yes', 0 => 'No']);
            $show->field('lastip');
            $show->logintime()->as(function ($logintime) {
                return date('Y-m-d H:i:s', $logintime);
            });
            $show->field('reg_ip');
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
                $form->text('username')->rules('required|unique:users', ['required' => 'Username is required', 'unique' => 'Username already exists']);
            } else {
                $form->display('username');
            }
            $form->text('password', 'Password')->creationRules('required|min:6|max:16', ['required' => 'Password is required', 'min' => 'Password must be at least 6 characters', 'max' => 'Password must be at most 16 characters']);
            $form->text('realname')->rules('required', ['required' => 'Full name is required']);

            $settlements = UserVip::all();
            $options = [];
            foreach ($settlements as $k => $v) {
                $options[$v->id] = $v->vipname;
            }
            $form->select('vip', 'Member Level')->options($options);


            $form->text('level')->value(0);
            $form->text('paypwd')->required();
            // $form->text('isonline');
            $form->radio('isagent')->options([1 => 'Yes', 0 => 'No'])->default(0);

            $settlements = \App\Models\User::where('isagent', 1)->get();
            $options = [];
            foreach ($settlements as $k => $v) {
                $options[$v->id] = $v->username;
            }
            $form->select('pid', 'Parent Agent')->options($options);

            $form->radio('allowagent')->options([1 => 'Yes', 0 => 'No'])->default(1);
            $form->text('balance')->disable()->default(0.0);
            $form->text('mbalance')->disable()->default(0.0);
            $form->text('phone');
            $form->text('mail');
            // $form->text('paysum');
            $form->radio('status')->options([1 => 'Active', 0 => 'Disabled'])->default(1);
            $form->radio('isdel')->options([1 => 'Yes', 0 => 'No'])->default(0);
            $form->radio('isblack')->options([1 => 'Yes', 0 => 'No'])->default(0);
            // $form->text('lastip');
            // $form->text('logintime');
            $form->text('sourceurl');
            // $form->text('loginsum');

            $form->saving(function (Form $form) {
                // Check if this is a create operation
                $form->vip = empty($form->vip) ? 1 :  $form->vip;
                if ($form->isCreating()) {
                    $form->settlement_id = 3;
                    $form->pid = intval($form->pid);
                    $form->password = Hash::make($form->password);
                    $form->paypwd = $form->paypwd ? Hash::make($form->paypwd) : '';
                } else {
                    if ($form->isagent) {
                        $form->settlement_id = 3;
                    }
                    $form->pid = intval($form->pid);
                    $form->password = $form->password ? Hash::make($form->password) : $form->model()->password;
                    $form->paypwd = ($form->paypwd && $form->model()->paypwd != $form->paypwd) ? Hash::make($form->paypwd) : $form->model()->paypwd;
                }
            });

            $form->display('created_at');
            $form->display('updated_at');
        });
    }
}
