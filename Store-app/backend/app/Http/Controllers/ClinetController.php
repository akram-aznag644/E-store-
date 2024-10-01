<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;
use Nette\Utils\Random;

class ClinetController extends Controller
{
    public function Store(Request $request){
        
      $request->validate([
        'USERNAME' => ['required', 'string',  'max:255', 'unique:users,name'],
        'EMAIL' => ['required',  'email', 'max:255', 'unique:users,email'],
        'PASSWORD' => ['required', 'string']
      ]);
      $client=User::create([
        'name'=>$request->USERNAME,
        'email'=>$request->EMAIL,
        'password'=>Hash::make($request->PASSWORD),
      ]);
      return response()->json(['data'=>$client]);
    }
    public function Login(Request $request){
      $user = User::where('email', $request->EMAIL)->first();

      if ($user && Hash::check($request->PASSWORD, $user->password)) {
        $token=$user->createToken('Auth_Token')->plainTextToken;
          return response()->json(['message' => 'valid', 'user' => $user,'token'=>$token,'role'=>$user->role->role], 200);
      } if(!$user) {
          return response()->json(['message' => 'Invalid credentials']);
      }
      
      


      // $password=Hash::check($request->PASSWORD,$user->password);
      // if($password){

      //   return response()->json(['message'=>'valid','user'=>$user]);
      // }
      // else{

      //   return response()->json(['message'=>'there is no user with these credentiales']);
      // }



    }
}
