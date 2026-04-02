<?php

namespace App\Http\Middleware;

use Closure;
use App\Models\SystemConfig;

class CrossHttp
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {

        $response = $next($request);
        
        $origin = $request->server('HTTP_ORIGIN') ? $request->server('HTTP_ORIGIN') : '';
        // dd($origin);
        $domain = SystemConfig::getValue('safe_domain');
        if ($domain) {
            $domain = explode(',',$domain);
            if (in_array($origin, $domain)) {
                $response->headers->set('Access-Control-Allow-Origin', $origin);
                // $response->headers->set('Access-Control-Allow-Origin', 'http://mb5.tggames.cc');
                $response->headers->set('Access-Control-Allow-Headers', 'Origin, Content-Type, Cookie, X-CSRF-TOKEN, Accept, Authorization, X-XSRF-TOKEN');
                // $response->headers->set('Access-Control-Expose-Headers', 'Authorization, authenticated');
                $response->headers->set('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, OPTIONS');
                $response->headers->set('Access-Control-Allow-Credentials', 'true');
            }
        } else {
            $response->headers->set('Access-Control-Allow-Origin', $origin);
                // $response->headers->set('Access-Control-Allow-Origin', 'http://mb5.tggames.cc');
                $response->headers->set('Access-Control-Allow-Headers', 'Origin, Content-Type, Cookie, X-CSRF-TOKEN, Accept, Authorization, X-XSRF-TOKEN');
                // $response->headers->set('Access-Control-Expose-Headers', 'Authorization, authenticated');
                $response->headers->set('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, OPTIONS');
                $response->headers->set('Access-Control-Allow-Credentials', 'true');
        }
        // die($origin);
        // $allow_origin = [
        //     'http://mb2m.tg-demo.cc:85',
        //     'http://m2.tggames.cc:86',
        //     '*'
        // ];
         
        // $response->header('Access-Control-Allow-Origin', '*');
        // $response->header('Access-Control-Allow-Headers', '*');
        // $response->header('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, OPTIONS');
        // $response->header('Access-Control-Allow-Credentials', 'false');
        

        return $response;
    }
}
