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

// badminton court rendered in portrait orientation, where [x, y] is relative to the top-left corner
$data = [
    "court" => [
        // court width => 6100 mm or 20'; court length: 13400 mm or 44'
        "origin" => [0, 0],
        "dimensions" => [COURT_WIDTH, COURT_LENGTH],

        // [x1,y1] to [x2,y2]
        "x1" => 0,
        "y1" => 0,
        "x2" => COURT_WIDTH,
        "y2" => COURT_LENGTH,
    ],

    "net" => [
        "origin" => [0, COURT_LENGTH / 2],
        "dimensions" => [COURT_WIDTH, 0],
        "x1" => 0,
        "y1" => COURT_LENGTH / 2,
        "x2" => COURT_WIDTH,
        "y2" => COURT_LENGTH / 2,
    ],

    "courtLines" => [
        // aka singles long service line, or baseline
        "back boundary line" => [
            [
                "origin" => [0, 0],
                "dimensions" => [COURT_WIDTH, LINE_WIDTH],
                "x1" => 0,
                "y1" => 0,
                "x2" => COURT_WIDTH,
                "y2" => LINE_WIDTH, 
            ],
        ],
        "doubles sideline" => [
            [
                "origin" => [0, 0],
                "dimensions" => [LINE_WIDTH, COURT_LENGTH],
                "x1" => 0,
                "y1" => 0,
                "x2" => LINE_WIDTH,
                "y2" => COURT_LENGTH
            ],
        ],
        "singles sideline" => [
            [
                "origin" => [LINE_WIDTH + SIDE_ALLEY_WIDTH, 0],
                "dimensions" => [LINE_WIDTH, COURT_LENGTH],
                "x1" => 460,
                "y1" => 0,
                "x2" => 500,
                "y2" => COURT_LENGTH
            ],
        ],
        "centre line" => [
            [
                "origin" => [LINE_WIDTH + SIDE_ALLEY_WIDTH + LINE_WIDTH + SERVICE_COURT_WIDTH, 0],
                "dimensions" => [LINE_WIDTH, LINE_WIDTH + BACK_ALLEY_WIDTH + LINE_WIDTH + SERVICE_COURT_LENGTH + LINE_WIDTH],
                "x1" => 3030,
                "y1" => 0,
                "x2" => 3070,
                "y2" => 4720
            ],
        ],
        "doubles long service line" => [
            [
                "origin" => [0, LINE_WIDTH + BACK_ALLEY_WIDTH],
                "dimensions" => [COURT_WIDTH, LINE_WIDTH],
                "x1" => 0,
                "y1" => 760,
                "x2" => COURT_WIDTH,
                "y2" => 800
            ],
        ],
        "short service line" => [
            [
                "origin" => [0, LINE_WIDTH + BACK_ALLEY_WIDTH + LINE_WIDTH + SERVICE_COURT_LENGTH],
                "dimensions" => [COURT_WIDTH, LINE_WIDTH],
                "x1" => 0,
                "y1" => 4680,
                "x2" => COURT_WIDTH,
                "y2" => 4720
            ],
        ]
    ],

    "serviceCourts" => [
        "right service court" => [
            [
                "origin" => [LINE_WIDTH + SIDE_ALLEY_WIDTH + LINE_WIDTH, LINE_WIDTH + BACK_ALLEY_WIDTH + LINE_WIDTH],
                "dimensions" => [SERVICE_COURT_WIDTH, SERVICE_COURT_LENGTH],
                "x1" => 500,
                "y1" => 800,
                "x2" => 3030,
                "y2" => 4680
            ],
        ],
        "left service court" => [
            [
                "origin" => [LINE_WIDTH + SIDE_ALLEY_WIDTH + LINE_WIDTH + SERVICE_COURT_WIDTH + LINE_WIDTH, LINE_WIDTH + BACK_ALLEY_WIDTH + LINE_WIDTH],
                "dimensions" => [SERVICE_COURT_WIDTH, SERVICE_COURT_LENGTH],
                "x1" => 3070,
                "y1" => 800,
                "x2" => 5600,
                "y2" => 4680
            ],
        ]
    ],

    "speedTest" => [
        "fast" => [
            [
                "origin" => [LINE_WIDTH + SIDE_ALLEY_WIDTH + LINE_WIDTH, 530],
                "dimensions" => [LINE_WIDTH, LINE_WIDTH],
                "x1" => 500,
                "y1" => 530,
                "x2" => 540,
                "y2" => 570 
            ],
        ],
        "slow" => [
            [
                "origin" => [LINE_WIDTH + SIDE_ALLEY_WIDTH + LINE_WIDTH, 950],
                "dimensions" => [LINE_WIDTH, LINE_WIDTH],
                "x1" => 500,
                "y1" => 950,
                "x2" => 540,
                "y2" => 990
            ],
        ]
    ]
];

// generate the counterpart court lines and services by flipping diagonally
foreach (['courtLines', 'serviceCourts', 'speedTest'] as $type) {
    foreach ($data[$type] as $name => $area) {
        $x2 = COURT_WIDTH  - $area[0]['x1'];
        $y2 = COURT_LENGTH - $area[0]['y1'];
        $x1 = COURT_WIDTH  - $area[0]['x2'];
        $y1 = COURT_LENGTH - $area[0]['y2'];

        $width  = $area[0]['dimensions'][0];
        $height = $area[0]['dimensions'][1];

        assert($area[0]['x1'] == $area[0]['origin'][0]);
        assert($area[0]['y1'] == $area[0]['origin'][1]);
        assert($x2 - $x1 == $width);
        assert($y2 - $y1 == $height);

        $mirror = [
            'origin'     => [$x1, $y1],
            'dimensions' => $area[0]['dimensions'],
            'x1'         => $x1,
            'y1'         => $y1,
            'x2'         => $x2,
            'y2'         => $y2,
        ];

        $data[$type][$name][] = $mirror;
    }
}

echo json_encode($data, JSON_PRETTY_PRINT);
