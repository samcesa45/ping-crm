<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrganizationResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'phone' => $this->phone,
            'address' => $this->address,
            'city' => $this->city,
            'region' => $this->region,
            'country' => $this->country,
            'postal_code' => $this->postal_code,
            'deleted_at' => $this->deleted_at,
            'contacts' => $this->contacts()->orderByName()->get()->map->only('id','name','city','phone'),
        ];
    }
}
