#version 130

#define MARKER_COLOR vec4(0.75, 0.0, 0.0, 1.0)
#define BEZIER_CURVE_COLOR vec3(0.0, 0.75, 0.0)

// TODO: at some combinations of p1, p2, p3 nothing is drawn
// TODO: explore math for 4 control points
uniform vec2 p1;
uniform vec2 p2;
uniform vec2 p3;
uniform float marker_radius;
uniform float bezier_curve_threshold;

// https://ru.wikipedia.org/wiki/%D0%A1%D0%BA%D0%B0%D0%BB%D1%8F%D1%80%D0%BD%D0%BE%D0%B5_%D0%BF%D1%80%D0%BE%D0%B8%D0%B7%D0%B2%D0%B5%D0%B4%D0%B5%D0%BD%D0%B8%D0%B5
// or use dot() standard function // scalar product
float cosphi(float delta_x1,float delta_y1,float delta_x2,float delta_y2) // rad
    {
    float top_frac = delta_x1*delta_x2 + delta_y1*delta_y2;
    float bottom_frac = sqrt(delta_x1*delta_x1 + delta_y1*delta_y1)*sqrt(delta_x2*delta_x2 + delta_y2*delta_y2);
    return (top_frac/bottom_frac);
    }

float line_segment_dist(float line_x1,float line_y1,float line_x2,float line_y2,float point_x,float point_y)
    {
    float delta_x1 = line_x2 - line_x1;
    float delta_y1 = line_y2 - line_y1;
    float delta_x2 = point_x - line_x1;
    float delta_y2 = point_y - line_y1;
    float cosphi12 = cosphi(delta_x1,delta_y1,delta_x2,delta_y2);
    float proj12p = cosphi12*sqrt(delta_x2*delta_x2 + delta_y2*delta_y2);
    float dist=0.0;
    if (proj12p < 0.0)
        {
        // left
        dist = sqrt(delta_x2*delta_x2 + delta_y2*delta_y2);
        }
    else if (proj12p > sqrt(delta_x1*delta_x1 + delta_y1*delta_y1))
        {
        // right
        delta_x2 = point_x - line_x2;
        delta_y2 = point_y - line_y2;
        dist = sqrt(delta_x2*delta_x2 + delta_y2*delta_y2);
        }
    else
        {
        float sqrin=(delta_x2*delta_x2 + delta_y2*delta_y2)-proj12p*proj12p;
        if (sqrin>0.0)
            dist = sqrt(sqrin);
        else
            dist = 0.0;
        }
    return dist;
    }

void main()
    {
    if (length(gl_FragCoord.xy - p1) < marker_radius ||
            length(gl_FragCoord.xy - p2) < marker_radius ||
            length(gl_FragCoord.xy - p3) < marker_radius)
        {
        gl_FragColor = MARKER_COLOR;
        }
    else
        {
        vec2 p0 = gl_FragCoord.xy;

        float rad_min = 1000000.0;
        float iner_t_min=0.0;

        float rad_iter;
        float iner_t;
        float step1=1.0/128.0;
        float bezier_y_prev;
        float bezier_x_prev;
        float bezier_y;
        float bezier_x;
        for (iner_t = 0.0; iner_t<= 1.0; iner_t+=step1)
            {
            bezier_y = p1.y + 2 * iner_t * (p2.y - p1.y) + iner_t * iner_t * (p3.y - 2 * p2.y + p1.y);
            bezier_x = p1.x + 2 * iner_t * (p2.x - p1.x) + iner_t * iner_t * (p3.x - 2 * p2.x + p1.x);
            if (iner_t != 0.0)
                {
                rad_iter = line_segment_dist(bezier_x_prev,bezier_y_prev,bezier_x,bezier_y,p0.x,p0.y);
                if (rad_iter < rad_min)
                    {
                    rad_min = rad_iter;
                    iner_t_min = iner_t;
                    }
                }
            bezier_y_prev = bezier_y;
            bezier_x_prev = bezier_x;
            }


        if ( rad_min < bezier_curve_threshold )
            {
            float r1 = rad_min / bezier_curve_threshold;

            if (0.0 <= r1 && r1 <= 1.0)
                {
                gl_FragColor = vec4(0.0, 0.75, 0.0, mix(1.0, 0.0, r1));
                }
            }
        else
            {
            gl_FragColor = vec4(0.0);
            }

        }
    }
