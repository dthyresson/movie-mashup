export const REALISM_OPTIONS = ['LOW', 'MEDIUM', 'HIGH', 'ULTRA']

const RealismSelector = ({ realism, setRealism }) => (
  <div className="mb-4">
    <div className="flex flex-row items-center justify-center">
      <p className="mr-4 text-lg font-medium text-gray-700">Photo Realism:</p>
      <div className="flex flex-row items-center">
        {REALISM_OPTIONS.map((level) => (
          <label
            key={level}
            className="mr-4 inline-flex items-center whitespace-nowrap"
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
