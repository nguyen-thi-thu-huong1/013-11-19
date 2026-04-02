<?php

namespace App\Admin\Actions\Grid\Activity;

use App\Models\Activity;
use App\Models\ActivityApply;
use Dcat\Admin\Actions\Response;
use Dcat\Admin\Grid\RowAction;
use Dcat\Admin\Traits\HasPermissions;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

class Refuse extends RowAction
{
    /**
     * @return string
     */
	protected $title = 'Reject';

    /**
     * Handle the action request.
     *
     * @param Request $request
     *
     * @return Response
     */
    public function handle(Request $request)
    {
        $id = $this->getKey();
        $item = ActivityApply::find($id);
        $item->state = 2;
        $item->save();
        $activity = Activity::find($item['activity_id']);
        $activity->apply_count++;
        $activity->save();

        return $this->response()
            ->success('Approved')
            ->refresh();
    }

    /**
	 * @return string|array|void
	 */
	public function confirm()
	{
		// return ['Confirm?', 'contents'];
	}

    /**
     * @param Model|Authenticatable|HasPermissions|null $user
     *
     * @return bool
     */
    protected function authorize($user): bool
    {
        return true;
    }

    /**
     * @return array
     */
    protected function parameters()
    {
        return [];
    }
}
