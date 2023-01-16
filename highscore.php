<?php
function save_scores($scores)
{

}

function load_scores()
{
    $scores = array();
    $names = array();
    $handle = @fopen('highscore.txt', 'r');

    while (($line = fgets($handle, 4096)) !== false) {
        $score = preg_split('/;/', $line, 3, PREG_SPLIT_NO_EMPTY);
        $names[trim($score[2])] = count($scores);
        $scores[] = (object) array(
            'step' => $score[0], 
            'time' => $score[1], 
            'name' => trim($score[2])
        );
    }

    fclose($handle);
    return (object) array(
        'name' => $names,
        'list' => $scores
    );
}


$scores = load_scores();

if (isset($_POST['name']) && isset($_POST['step']) && isset($_POST['time'])) {
}

save_scores($scores->list);

header('Content-Type: application/json');
echo json_encode($scores->list);
?>
