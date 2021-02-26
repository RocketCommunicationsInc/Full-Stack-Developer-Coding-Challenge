<?php

namespace Database\Factories;

use App\Models\Alert;
use Illuminate\Database\Eloquent\Factories\Factory;

class AlertFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Alert::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'uuid' => $this->faker->uuid,
            'severity' => $this->faker->word,
            'category' => $this->faker->word,
            'message' => $this->faker->word,
            'long_message' => $this->faker->sentence,
            'time' => $this->faker->dateTime('now'),
            'selected' => $this->faker->boolean,
            'new' => $this->faker->boolean,
            'expanded' => $this->faker->boolean
        ];
    }
}
