<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class EmailVerification extends Mailable {
  use Queueable, SerializesModels;

  /**
   * Create a new message instance.
   *
   * @return void
   */

  private $full_name;
  private $email_verification_token;

  public function __construct($user) {
    $this->full_name = $user->full_name;
    $this->email_verification_token = $user->email_verification_token;
  }

  /**
   * Build the message.
   *
   * @return $this
   */
  public function build() {
    return $this->view('mail.emailVerification', [
      "full_name" => $this->full_name,
      "email_verification_token" => $this->email_verification_token,
    ]);
  }
}
