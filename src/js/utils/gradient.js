export const GradientStyles = ["Linear", "Radial"];
export const GradientDirections = {"Linear": ["Top", "Top right", "Right", "Bottom right", "Bottom", "Bottom left", "Left", "Top Left"], 
                "Radial": ["Center", "Top", "Top right", "Right", "Bottom right", "Bottom", "Bottom Left", "Left", "Top left"]};


function componentToHex(c) {
	var hex = c.toString(16);
	return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(color) {
	return "#" + componentToHex(color.r) + componentToHex(color.g) + componentToHex(color.b);
}

export function getStyle(gradientForm) {
	var styles = [];
	var color1, color2;
	var st_style = {
		"top": "to bottom",
		"top right": "top right",
		"right": "to left",
		"bottom right": "bottom right",
		"bottom": "to top",
		"bottom left": "bottom left",
		"left": "to right",
		"top left": "top left",
		"center": "ellipse at center"
	};

	color1 = rgbToHex(gradientForm.startPointColor);
	color2 = rgbToHex(gradientForm.endPointColor);
	styles.push(color1);

	if (gradientForm.style === "Linear") {
		styles.push("-webkit-linear-gradient(" + gradientForm.direction.toLowerCase() + "," + color1 + "," + color2 + ")");
		styles.push("-o-linear-gradient(" + gradientForm.direction.toLowerCase() + "," + color1 + "," + color2 + ")");
		styles.push("-moz-linear-gradient(" + gradientForm.direction.toLowerCase() + "," + color1 + "," + color2 + ")");
		styles.push("linear-gradient(" + st_style[gradientForm.direction.toLowerCase()] + "," + color1 + "," + color2 + ")"); // standard
	} else {
		styles.push("-webkit-radial-gradient(" + gradientForm.direction.toLowerCase() + "," + color1 + "," + color2 + ")");
		styles.push("-o-radial-gradient(" + gradientForm.direction.toLowerCase() + "," + color1 + "," + color2 + ")");
		styles.push("-moz-radial-gradient(" + gradientForm.direction.toLowerCase() + "," + color1 + "," + color2 + ")");
		styles.push("radial-gradient(" + st_style[gradientForm.direction.toLowerCase()] + "," + color1 + "," + color2 + ")"); // standard
	}

	return styles;
}