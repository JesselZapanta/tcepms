<?php

namespace App\Notifications;

use Illuminate\Notifications\Notification;
use Twilio\Rest\Client;

class TwilioProjectUpdateNotification extends Notification
{
    protected $projectName;

    public function __construct($projectName)
    {
        $this->projectName = $projectName;
    }

    public function via($notifiable)
    {
        return ['twilio'];
    }

    public function toTwilio($notifiable)
    {
        $twilio = new Client(env('TWILIO_SID'), env('TWILIO_AUTH_TOKEN'));

        $twilio->messages->create(
            $notifiable->contact,
            [
                'from' => env('TWILIO_PHONE_NUMBER'),
                'body' => "Project Update: {$this->projectName}",
            ]
        );
    }
}
