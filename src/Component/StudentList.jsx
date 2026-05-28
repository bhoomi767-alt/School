

import students from "../Data/students";

export default function StudentList(){
    return(
        <div className="p-6 bg-gray-100">

            <h1 className="text-3xl font-bold text-center mb-6">
                Our Students
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

                {students.map((s) => (
                    <div 
                        key={s.id}
                        className="bg-white rounded-xl shadow-lg p-5 hover:scale-105 transition duration-300"
                    >
                        <h2 className="text-xl font-bold mb-2">{s.name}</h2>

                        <p className="text-gray-600">Class: {s.class}</p>
                        <p className="text-gray-600">Section: {s.section}</p>

                        <button className="mt-4 bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-800">
                            View Profile
                        </button>
                    </div>
                ))}

            </div>

        </div>
    )
}