<?php

namespace App\Enums;

use BenSampo\Enum\Enum;

final class TaskStatus extends Enum
{
    const NotStarted =   0;
    const InProgress =   1;
    const Completed = 2;
}
