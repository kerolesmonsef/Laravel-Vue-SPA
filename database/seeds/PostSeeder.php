<?php

use Illuminate\Database\Seeder;
use App\Post;

class PostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->build();
    }

    private function build()
    {
        $factory = Faker\Factory::create();
        for ($i = 0; $i < 10; $i++) {
            Post::create([
                'user_id' => 1,
                "contents" => $factory->paragraph(1),
                "tags" => $factory->sentence(2),
                "claps"=>rand(10, 30),
            ]);
        }
    }
}
