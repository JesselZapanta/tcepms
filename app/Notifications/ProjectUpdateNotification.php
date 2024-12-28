<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;

class ProjectUpdateNotification extends Notification implements ShouldQueue
{
    use Queueable;

    protected $projectName;

    /**
     * Create a new notification instance.
     *
     * @param string $projectName
     */
    public function __construct($projectName)
    {
        $this->projectName = $projectName;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param mixed $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param mixed $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        $url = config('app.url');

        return (new MailMessage)
            ->subject('New Update on Project: ' . $this->projectName)
            ->greeting('Hello ' . $notifiable->name . ',')
            ->line('A new update has been added to the project: ' . $this->projectName . '.')
            ->action('View Project Updates',  $url)
            ->line('Thank you for staying updated with our project!');
    }

    /**
     * Get the array representation of the notification.
     *
     * @param mixed $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return [
            
        ];
    }
}
