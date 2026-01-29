<?php

namespace App\Enums;

enum Role : string
{

    case SUPERADMIN = 'Super Admin';
    case CONTRIBUTOR = 'Contributor';
    case VIEWER = 'Viewer';

    

}
