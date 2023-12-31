requirejs(['ext_editor_io2', 'jquery_190', 'raphael_210'],
    function (extIO, $) {
        function frogs_collision_visualization(tgt_node, data) {
            if (!data || !data.ext) {
                return
            }

            /**
             * 
             * attr
             * 
             */
            const attr = {
                coord: {
                    'text-anchor': 'start',
                    'font-family': 'times',
                    'font-size': '9px',
                },
                collision: {
                    circle: {
                        'stroke-width': '0px',
                        'fill': '#F0801A',
                    },
                    coord: {
                        'fill': '#FF0000',
                        'stroke-width': '0px',
                        'text-anchor': 'start',
                        'font-family': 'times',
                        'font-size': '9px',
                    },
                },
                axis: {
                    'stroke-width': '0.5px',
                    'arrow-end': 'block-wide-long',
                },
                elm_1: {
                    'stroke': '#0000FF',
                    'stroke-width': '2px',
                },
                elm_2: {
                    'stroke': '#F0801A',
                    'stroke-width': '2px',
                    'stroke-dasharray': '1 1',
                },
            }

            /**
             * 
             * values
             * 
             */
            const input = data.in
            const answer = data.ext.answer
            const hop_1 = answer || data.ext.explanation.hop_1
            const hop_2 = answer || data.ext.explanation.hop_2
            const grid_seize_px = 180
            const os = 20

            const [x1, y1, dx1, dy1] = input[0].values
            const [x2, y2, dx2, dy2] = input[1].values
            let max_y = Math.max(y1, y2, y1 + hop_1 * dy1, y2 + hop_1 * dy2)
            let min_y = Math.min(y1, y2, y1 + hop_1 * dy1, y2 + hop_1 * dy2)
            let max_x = Math.max(x1, x2, x1 + hop_2 * dx1, x2 + hop_2 * dx2)
            let min_x = Math.min(x1, x2, x1 + hop_2 * dx1, x2 + hop_2 * dx2)
            let range = Math.max(max_y - min_y, max_x - min_x)
            if (max_y <= 0) {
                max_y = range * 0.25
            }
            if (max_x <= 0) {
                max_x = range * 0.25
            }
            if (min_y >= 0) {
                min_y = range * -0.25
            }
            if (min_x >= 0) {
                min_x = range * -0.25
            }
            range = Math.max(max_y - min_y, max_x - min_x)
            const scale = grid_seize_px / range

            /**
             * 
             * paper
             * 
             */
            const paper = Raphael(tgt_node, grid_seize_px + os * 2, grid_seize_px + os * 2)

            /**
             * 
             * draw lines
             * 
             */
            function coords(x, y, dx, dy, hop) {
                const sx =(x - min_x) * scale + os 
                const sy =(range - (y - min_y)) * scale + os 
                const ex =((x - min_x) + dx * hop) * scale + os 
                const ey =((range - (y - min_y)) - dy * hop) * scale + os 
                return [sx, sy, ex, ey]
            }

            // element_1
            const [sx1, sy1, ex1, ey1] = coords(x1, y1, dx1, dy1, hop_1)
            paper.path([ 'M', sx1, sy1, 'L', ex1, ey1,]).attr(attr.elm_1)
            paper.text(sx1, sy1, `(${x1}, ${y1})`).attr(attr.coord)
            if (answer) {
                paper.circle(ex1, ey1, 3).attr(attr.collision.circle)
                paper.text(ex1, ey1, `(${x1 + dx1 * hop_1}, ${y1 + dy1 * hop_1})`).attr(attr.collision.coord)
            }

            // element_2
            const [sx2, sy2, ex2, ey2] = coords(x2, y2, dx2, dy2, hop_2)
            paper.path([ 'M', sx2, sy2, 'L', ex2, ey2,]).attr(attr.elm_2)
            paper.text(sx2, sy2, `(${x2}, ${y2})`).attr(attr.coord)

            /**
             * 
             * axis 
             * 
            */

            // y-axis
            paper.path([
                'M', (0 - min_x) * scale + os, grid_seize_px + os,
                'L', (0 - min_x) * scale + os, 0 + os,
            ]).attr(attr.axis)

            // x-axis
            paper.path([
                'M', 0 + os, (range - (0 - min_y)) * scale + os,
                'L', grid_seize_px + os, (range - (0 - min_y)) * scale + os,
            ]).attr(attr.axis)

            /**
             * 
             * origin 
             * 
             */
            const ox = -min_x * scale + -7 + os 
            const oy = (range - (- min_y)) * scale + 7 + os 
            paper.text(ox, oy, 0).attr(attr.coord)
        }
        var io = new extIO({
            animation: function ($expl, data) {
                frogs_collision_visualization(
                    $expl[0],
                    data,
                );
            }
        });
        io.start();
    }
);
