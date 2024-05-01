<?php

namespace Database\Factories;

use App\Models\Organization;
use Illuminate\Support\Str;
use App\Models\Account;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Organization>
 */
class OrganizationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

     protected $model = Organization::class;

    public function definition(): array
    {
       
        $account = Account::create(['id' => Str::uuid(), 'name' => 'Acme Corporation']);
        $accountId = $account->id;
     
        return [
            'id' => $this->faker->uuid,
           'name' => $this->faker->company,
           'account_id' => $accountId,
           'email' => $this->faker->companyEmail,
           'phone' => $this->faker->tollFreePhoneNumber,
           'address' => $this->faker->streetAddress,
           'city' => $this->faker->city,
           'region' => $this->faker->state,
           'country' => 'US',
           'postal_code' => $this->faker->postcode,
        ];
    }
}
