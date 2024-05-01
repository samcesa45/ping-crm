<?php

namespace Database\Seeders;
use Illuminate\Support\Str;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\User;
use App\Models\Account;
use App\Models\Contact;
use App\Models\Organization;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        $user = User::factory()->create([
            'id' => Str::uuid(),
            'first_name' => 'Jane',
            'last_name' => 'Doe',
            'email' => 'janedoe@example.com',
            'owner' => true
        ]);

        $account = Account::create([
          'id' => Str::uuid(),
          'name' => 'Acme Corporation', 
          'user_id' => $user->id]);
        
         $organizationId = Str::uuid();
         
        $organizations = Organization::factory()->count(100)->create([
            'account_id' =>  $account->id 
        ]);

        Contact::factory()->count(100)->create(['account_id' =>  $account->id ])
          ->each(function (Contact $contact) use ($account) {
            $organizations = Organization::where('account_id', $account->id)->inRandomOrder()->first();
              $contact->update(['organization_id' => $organizations->id]);
          });
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
    }
}
