<?php

namespace App\Http\Controllers;

use App\Post;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     */
    public function index()
    {
        $posts = (new Post)->newQuery();
        $posts->join('users_spa1', 'users_spa1.id', '=', 'posts_spa_l.user_id');
        $posts->selectRaw('posts_spa_l.* , users_spa1.name as user_name');
        $posts->orderBy('posts_spa_l.id', 'DESC');
        $posts = $posts->get()->map(function ($post){
           $post->createdAt = Carbon::parse($post->created_at)->diffForHumans();
           return $post;
        });

        return \response()->json([
            'posts' => $posts,
        ], 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return void
     */
    public function create()
    {
        Post::create([
            "contents" => request('contents'),
            "tags" => request('tags'),
            "user_id" => request('user_id'),
        ]);
        return response()->json([
            "message" => "created successfully",
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return void
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Like The Post
     *
     * @return void
     */
    public function like()
    {
        $post_id = request('post_id');
        $post = Post::Find($post_id);
        $post->claps = ($post->claps ?? 0) + 1;
        $post->save();

        return response()->json([
            'message' => 'post liked successfully'
        ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param \App\Post $post
     * @return void
     */
    public function show(Post $post)
    {
        $user = $post->user;
        $post->user_name = $user->name;

        return response()->json([
            'post' => $post
        ], 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param \App\Post $post
     * @return Response
     */
    public function edit(Post $post)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param \App\Post $post
     * @return Response
     */
    public function update(Request $request, Post $post)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Post $post
     * @return Response
     */
    public function destroy(Post $post)
    {
        //
    }
}
