<?php

namespace Database\Factories;

use App\Models\Contact;
use Illuminate\Database\Eloquent\Factories\Factory;

class ContactFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Contact::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'object_id' => $this->faker->uuid,
            'uuid' => $this->faker->uuid,
            'status' => $this->faker->word,
            'name' => $this->faker->word,
            'ground' => $this->faker->word,
            'satellite' => $this->faker->word,
            'equipment' => $this->faker->word,
            'state' => $this->faker->word,
            'step' => $this->faker->word,
            'detail' => $this->faker->word,
            'begin_at' => $this->faker->dateTimeBetween('now', '+3 days'),
            'end_at' => $this->faker->dateTimeBetween('+3 days', '+9 days'),
            'lng' => $this->faker->latitude,
            'lat' => $this->faker->longitude,
            'azimuth' => $this->faker->randomFloat(3),
            'elevation' => $this->faker->randomFloat(2),
            'resolution' => $this->faker->word,
            'resolution_status' => $this->faker->word,
        ];
    }
}
