<?php
/**
 * @copyright 2025 Anthon Pang
 * @license MIT
 *
 * @see Sport England, "Badminton: Design Guidance Note", 2011
 *
 * {@internal
 *   For the specifications, we follow Sport England's use of millimetres.
 *   Elsewhere, we revert to using imperial feet and inches.
 * }
 */

define('COURT_WIDTH', 6100);
define('COURT_LENGTH', 13400);
define('LINE_WIDTH', 40);
define('SERVICE_COURT_WIDTH', 2530);
define('SERVICE_COURT_LENGTH', 3880);
define('SIDE_ALLEY_WIDTH', 420); // between the singles and doubles sidelines
define('BACK_ALLEY_WIDTH', 720); // between the singles and doubles long service lines

// badminton court rendered in portrait orientation, where [x, y] is relative to the top-left corner;
// only half of the lines, service courts, and speed test markers are specified here;
// we use code to mirror the other half
$source = [
    "court" => [
        // [x, y]
        "origin" => [0, 0],

        // court width => 6100 mm or 20'; court length: 13400 mm or 44'
        "dimensions" => [COURT_WIDTH, COURT_LENGTH],
    ],

    "net" => [
        "origin" => [0, COURT_LENGTH / 2],
        "dimensions" => [COURT_WIDTH, 0],
    ],

    "courtLines" => [
        // aka singles long service line, or baseline
        "back boundary line" => [
            "origin" => [0, 0],
            "dimensions" => [COURT_WIDTH, LINE_WIDTH],
        ],
        "doubles sideline" => [
            "origin" => [0, 0],
            "dimensions" => [LINE_WIDTH, COURT_LENGTH],
        ],
        "singles sideline" => [
            "origin" => [LINE_WIDTH + SIDE_ALLEY_WIDTH, 0],
            "dimensions" => [LINE_WIDTH, COURT_LENGTH],
        ],
        "centre line" => [
            "origin" => [LINE_WIDTH + SIDE_ALLEY_WIDTH + LINE_WIDTH + SERVICE_COURT_WIDTH, 0],
            "dimensions" => [LINE_WIDTH, LINE_WIDTH + BACK_ALLEY_WIDTH + LINE_WIDTH + SERVICE_COURT_LENGTH + LINE_WIDTH],
        ],
        "doubles long service line" => [
            "origin" => [0, LINE_WIDTH + BACK_ALLEY_WIDTH],
            "dimensions" => [COURT_WIDTH, LINE_WIDTH],
        ],
        "short service line" => [
            "origin" => [0, LINE_WIDTH + BACK_ALLEY_WIDTH + LINE_WIDTH + SERVICE_COURT_LENGTH],
            "dimensions" => [COURT_WIDTH, LINE_WIDTH],
        ]
    ],

    // for simplicity, this excludes the side and back alleys
    // because the service courts vary in dimensions depending on singles vs doubles, and doubles serving vs receiving
    "serviceCourts" => [
        "right service court" => [
            "origin" => [LINE_WIDTH + SIDE_ALLEY_WIDTH + LINE_WIDTH, LINE_WIDTH + BACK_ALLEY_WIDTH + LINE_WIDTH],
            "dimensions" => [SERVICE_COURT_WIDTH, SERVICE_COURT_LENGTH],
        ],
        "left service court" => [
            "origin" => [LINE_WIDTH + SIDE_ALLEY_WIDTH + LINE_WIDTH + SERVICE_COURT_WIDTH + LINE_WIDTH, LINE_WIDTH + BACK_ALLEY_WIDTH + LINE_WIDTH],
            "dimensions" => [SERVICE_COURT_WIDTH, SERVICE_COURT_LENGTH],
        ]
    ],

    // markers used to determine if a shuttlecock has the correct flight speed
    "speedTest" => [
        "fast" => [
            "origin" => [LINE_WIDTH + SIDE_ALLEY_WIDTH + LINE_WIDTH, 530],
            "dimensions" => [LINE_WIDTH, LINE_WIDTH],
        ],
        "slow" => [
            "origin" => [LINE_WIDTH + SIDE_ALLEY_WIDTH + LINE_WIDTH, 950],
            "dimensions" => [LINE_WIDTH, LINE_WIDTH],
        ]
    ]
];

$data = [];

foreach (['court', 'net'] as $type) {
    $data[$type] = [
        'x' => $source[$type]['origin'][0],
        'y' => $source[$type]['origin'][1],
        'w' => $source[$type]['dimensions'][0],
        'h' => $source[$type]['dimensions'][1],
    ];
}

// generate the counterpart court lines and services by flipping diagonally
foreach (['courtLines', 'serviceCourts', 'speedTest'] as $type) {
    $data[$type] = [];

    foreach ($source[$type] as $name => $area) {
        $x = $source[$type][$name]['origin'][0];
        $y = $source[$type][$name]['origin'][1];
        $w = $source[$type][$name]['dimensions'][0];
        $h = $source[$type][$name]['dimensions'][1];

        $data[$type][$name] = [];
        $data[$type][$name][] = [
            'x' => $x,
            'y' => $y,
            'w' => $w,
            'h' => $h,
        ];

        $data[$type][$name][] = [
            'x' => COURT_WIDTH - $x - $w,
            'y' => COURT_LENGTH - $y - $h,
            'w' => $w,
            'h' => $h
        ];
    }
}

echo json_encode($data, JSON_PRETTY_PRINT);
