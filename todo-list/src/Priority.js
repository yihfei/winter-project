export const Priority = {
    LOW: "Low",
    MEDIUM: "Medium",
    HIGH: 'High'
}

export const getPriorityColor = (priority) => {
    switch (priority) {
        case 'Low':
            return '#42A5F5';
        case 'Medium':
            return '#FFD54F';
        case 'High':
            return '#EF5350';
        default:
            return '#42A5F5';
    }
};
