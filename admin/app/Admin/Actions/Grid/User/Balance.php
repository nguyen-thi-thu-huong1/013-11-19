<?php

namespace App\Admin\Actions\Grid\User;
use App\Models\Users;
use Dcat\Admin\Actions\Response;
use Dcat\Admin\Grid\RowAction;
use Illuminate\Http\Request;
use Dcat\Admin\Widgets\Modal;
use App\Admin\Forms\Userbalance;
class Balance extends RowAction
{
    /**
     * @return string
     */
	protected $title = 'Adjust Balance';

    /**
     * Handle the action request.
     *
     * @param Request $request
     *
     * @return Response
     */
    public function render()
    {
/*        $item = Users::find($id);
        $table = Userbalance::make($item->toArray());*/
        $form = Userbalance::make()->payload(['id' => $this->getKey()]);

        return Modal::make()
            ->lg()
            ->title('Adjust Balance')
            ->body($form)
            ->button('Adjust Balance');

    }

    /**
	 * @return string|array|void
	 */
	public function confirm()
	{
       // return ['Are you sure you want to delete this row?', 'Modal content'];
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
