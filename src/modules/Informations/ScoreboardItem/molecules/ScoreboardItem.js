import Picture from '@/modules/Player/Avatar/atoms/Picture/Picture';
import './ScoreboardItem.scss';

export default function ScoreboardItem({player, score, isEven}) {
    return (
        <div className={'scoreboard-item ' + (isEven ? 'even-item' : '')}>
            <Picture src="images/player.jpg" size="40" />
            <p>{player} - {score} pts</p>
        </div>
    )
}