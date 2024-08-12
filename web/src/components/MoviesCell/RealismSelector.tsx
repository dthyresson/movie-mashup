export const REALISM_OPTIONS = ['LOW', 'MEDIUM', 'HIGH', 'ULTRA']

const RealismSelector = ({ realism, setRealism }) => (
  <div className="mb-4">
    <div className="flex flex-col items-center justify-center sm:flex-row">
      <div className="flex flex-wrap items-center justify-start gap-4">
        <span className="text-lg font-medium text-gray-500">
          Photo Realism:
        </span>
        {REALISM_OPTIONS.map((level) => (
          <label
            key={level}
            className="inline-flex items-center whitespace-nowrap"
          >
            <input
              type="radio"
              className="form-radio text-orange-500 focus:ring-orange-500 focus:ring-offset-0"
              name="realism"
              id={`realism-${level}`}
              value={level}
              checked={realism === level}
              onChange={() => setRealism(level)}
            />
            <span className="ml-2 capitalize text-gray-500">{level}</span>
          </label>
        ))}
      </div>
    </div>
  </div>
)

export default RealismSelector
