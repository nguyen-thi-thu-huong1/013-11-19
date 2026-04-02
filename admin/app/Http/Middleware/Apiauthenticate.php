<?php

namespace App\Http\Middleware;
use Closure;
use \Illuminate\Http\Request;  
use \Illuminate\Support\Facades\DB;
class Apiauthenticate
{
    /**
     * Get the path the user should be redirected to when they are not authenticated.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return string
     */
/*    protected function redirectTo($request)
    {
        if (! $request->expectsJson()) {
           print_r($request->expectsJson());
           exit;
            $return = ['code' => 401,'message' => '未授权','data' => []];
            echo json_encode($return);
            exit;
        } else {
            $return = ['code' => 401,'message' => '未授权','data' => []];
            echo json_encode($return);
            exit;
        }
    }*/
    
    public function handle($request, Closure $next)
    {
     $token = $request->header('Authorization');
     $token = str_replace('Bearer ','',$token) ;

        if(empty($token)){
            return json_encode(['code'=>401,'message'=>'认证失败']);
            exit;
        }
        $user = DB::select('select * from users where api_token ="'.$token.'"');
        if(empty($user)){
            return json_encode(['code'=>401,'message'=>'认证失败']);
            exit;
        }       

        return $next($request);
    }
    

}
