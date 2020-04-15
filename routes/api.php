<?php

use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'auth'], function ($router) {

    Route::post('login', 'AuthController@login')->name('login');
    Route::post('logout', 'AuthController@logout');
    Route::post('refresh', 'AuthController@refresh');
    Route::post('me', 'AuthController@me');
//    Route::post('posts')
});

Route::post('user/signUp', "UserController@store")->name('user.store');
Route::get('post', 'PostController@index')->name('post.index');
Route::post('post/create', 'PostController@create')->name('post.create')->middleware('jwt.auth');
Route::get('post/show/{post}', 'PostController@show')->name('post.show');
Route::put('post/like', 'PostController@like')->name('post.like');

