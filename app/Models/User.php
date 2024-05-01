<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class User extends Model implements AuthenticatableContract, AuthorizableContract
{
    use HasUuids,SoftDeletes, Authenticatable, Authorizable, HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
        'owner' => 'boolean'
    ];


    public function account()
    {
        return $this->belongsTo(Account::class);
    }

    public function getNameAttribute()
    {
        return $this->first_name.''.$this->last_name;
    }

    public function setPasswordAttribute($password)
    {
        if(!$password) return;

        $this->attributes['password'] = Hash::make($password);
    }

    public function setPhotoAttribute($photo)
    {
        if(!$photo) return;

        $this->attributes['photo_path'] = $photo instanceof UploadedFile ? $photo->store('user') : $photo;
    }

    public function getPhotoAttribute() {
        return $this->photoUrl(['w' =>40,'h' => 40,'fit' => 'crop']);
    }

    public function photoUrl(array $attributes)
    {
        if($this->photo_path){
            return URL::to(App::make(Server::class)->fromPath($this->photo_path,$attributes));
        }
    }

    public function isDemoUser()
    {
        return $this->email === 'janedoe@gmail.com';
    }

    public function scopeOrderByName($query)
    {
        $query->orderBy('last_name')->orderBy('first_name');
    }

    public function scopeWhereRole($query, $role) 
    {
       switch ($role) {
        case 'user': return $query->where('owner',false);
        case 'owner':return $query->where('owner',true);

       }
    }


    public function scopeFilter($query, array $filters)
    {
        $query->when($filters['search'] ?? null, function($query, $search){
            $query->where(function ($query) use ($search) {
                $query->where('first_name', 'like', '%$search%')
                   ->orWhere('last_name','like','%$search%')
                   ->orWhere('email','like','%$search%');
            });
        })->when($filters['role'] ?? null, function($query, $role) {
            $query->whereRole($role);
        })->when($filters['trashed'] ?? null, function($query,$trashed) {
            if($trashed === 'with') {
                $query->withTrashed();
            } elseif($trashed === 'only') {
                $query->onlyTrashed();
            }
        });
    }
}
