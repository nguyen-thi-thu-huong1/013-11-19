<?php

namespace App\Admin\Controllers;

use App\Admin\Repositories\Api;
use Dcat\Admin\Form;
use Dcat\Admin\Grid;
use Dcat\Admin\Show;
use Dcat\Admin\Admin;
use Dcat\Admin\Http\Controllers\AdminController;

class ApiController extends AdminController
{
    /**
     * Make a grid builder.
     *
     * @return Grid
     */
 
	protected $category = ['1' => '<font color="blue">可用</font>','0' => '<font color="red">禁用</font>'];  
    protected function grid()
    {
        return Grid::make(new Api(), function (Grid $grid) {
            $grid->column('id')->sortable();
            $grid->column('api_code');
            $grid->column('api_name');
            $grid->column('api_money')->display(function (){
				$id = 'money_'.$this->api_code;
                return '<span id='.$id.'>'.$this->api_money."</span>&nbsp;&nbsp;&nbsp;<a  onclick='test(this)' id='$this->api_code'>刷新</a>";
            });			
            $grid->column('state')->using($this->category);
			$grid->column('order_by');
            $grid->column('created_at');
            // $grid->column('updated_at')->sortable();
            
            $grid->filter(function (Grid\Filter $filter) {
                $filter->equal('id');
				$filter->like('api_code');
        
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
        return Show::make($id, new Api(), function (Show $show) {
            $show->field('id');
            $show->field('api_code');
            $show->field('api_name');
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
        return Form::make(new Api(), function (Form $form) {
            $form->display('id');
            $form->text('api_code');
            $form->text('api_name');
			$form->text('order_by')->help("数字越小越靠前");
            $form->radio('state')->options([1 => '可用',0 => '禁用']);        
            $form->display('created_at');
            $form->display('updated_at');
        });
    }
}
