import React from "react"
function getSalaryByCity(employees) {
    const result = {};
    employees.forEach(emp => {
        const city = emp[2];
        const salary = Number(emp[5].replace(/[$,]/g, ""))
        if (!result[city]) {
            result[city] = 0;
        }
        result[city] += salary
    });
    return result;
}
export default function SalaryChart() {
    let employees = [];
    try {
        employees = JSON.parse(localStorage.getItem("employees")) || [];
    } catch {
        employees = [];
    }
    const salaryData = getSalaryByCity(employees);
    const cities = Object.keys(salaryData);
    const maxSalary = Math.max(...Object.values(salaryData), 1);
    const chartHeight = 300;
    const barWidth = 60;
    const gap = 40;

    return (
        <div>
            <h2 className="text-green-500 text-2xl font-semibold mb-4">Salary distribution per city</h2>
            <svg width="800" height="350">
                {cities.map((city, index) => {
                    const salary = salaryData[city];
                    const barHeight = (salary / maxSalary) * chartHeight;
                    const x = index * (barWidth + gap);
                    const y = chartHeight - barHeight + 20;
                    return (
                        <g key={city}>
                            <rect x={x} y={y} width={barWidth} height={barHeight} fill="#2563EB" />
                            <text x={x + barWidth / 2} y={chartHeight + 40} textAnchor="middle" fontSize="12">{city}</text>
                            <text x={x + barWidth / 2} y={y - 5} textAnchor="middle" fontSize="12">${salary.toLocaleString()}</text>

                        </g>
                    )
                })}


            </svg>

        </div>
    )
}