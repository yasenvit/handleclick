import PrintGoal from './PrintGoal';
import LevelBranches from './LevelBranches';
import PrintTitle from './PrintTitle';

const Axis = (props) => {
    console.log("Axis function")
    /* function builds diagram axis */
    const { canvas, leftEdge, axisHeightPosition, axisLength, canvasWidth, canvasHeight } = props;
    let axis = canvas.getContext('2d');
    axis.clearRect(0, 0, canvasWidth, canvasHeight);
    axis.beginPath();
    axis.moveTo(leftEdge, axisHeightPosition);
    axis.lineTo(leftEdge + axisLength, axisHeightPosition);
    axis.lineWidth = 2;
    axis.strokeStyle = '#333333';
    axis.stroke();
}



export default Axis;
