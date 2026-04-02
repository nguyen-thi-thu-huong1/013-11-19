<?php
namespace App\Admin\Controllers;

use App\Admin\Forms\ClearForm;
use Dcat\Admin\Http\Controllers\AdminController;
use App\Admin\Forms\PaySetting;
use App\Admin\Forms\SiteSetting;
use App\Http\Controllers\Controller;
use Dcat\Admin\Widgets\Card;
use Dcat\Admin\Layout\Content;

class SystemConfigController extends AdminController
{
    public function index(Content $content)
    {
        return $content
            ->title('Payment Settings')
            ->body(new Card(new PaySetting()));
    }

    public function siteSetting(Content $content)
    {
        return $content
            ->title('Website Settings')
            ->body(new Card(new SiteSetting()));
    }

    public function clear(Content $content)
    {
        return $content->title('Data Cleanup')->body(new Card(new ClearForm()));
    }
}