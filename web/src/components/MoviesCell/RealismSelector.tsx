export const REALISM_OPTIONS = ['LOW', 'MEDIUM', 'HIGH', 'ULTRA']

const RealismSelector = ({ realism, setRealism }) => (
  <div className="mb-4">
    <div className="flex flex-col items-center justify-center sm:flex-row">
      <p className="mb-2 text-lg font-medium text-gray-700 sm:mb-0 sm:mr-4">
        Photo Realism:
      </p>
      <div className="flex flex-wrap justify-center">
        {REALISM_OPTIONS.map((level) => (
          <label
            key={level}
            className="mb-2 mr-4 inline-flex items-center whitespace-nowrap"
          >
            <input
              type="radio"
              className="form-radio"
              name="realism"
              id={`realism-${level}`}
              value={level}
              checked={realism === level}
              onChange={() => setRealism(level)}
            />
            <span className="ml-2 capitalize text-gray-700">{level}</span>
          </label>
        ))}
      </div>
    </div>
  </div>
)

export default RealismSelector
