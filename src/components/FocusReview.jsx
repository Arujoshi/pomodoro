function FocusReview({
  task,
  brainDumps,
  onConvertToTask,
  onDeleteBrainDump,
  onClose,
}) {
  const urgentBrainDumps = brainDumps.filter(
    (brainDump) => brainDump.category === "urgent"
  );

  return (
    <div className="focus-review-overlay">
      <div className="focus-review">

        {/* Success header */}
        <div className="focus-review-header">

          <div className="focus-complete-icon">
            🍅
          </div>

          <div className="focus-review-eyebrow">
            SESSION COMPLETE
          </div>

          <h2>
            Nice work. 🌿
          </h2>

          {task && (
            <p className="focus-review-task">
              You focused on{" "}
              <strong>{task.title}</strong>
            </p>
          )}

        </div>


        {/* Divider */}
        <div className="focus-review-divider" />


        {/* Brain dump section */}
        <div className="focus-review-body">

          <div className="review-section-heading">

            <div className="review-brain-icon">
              🧠
            </div>

            <div>
              <h3>Brain Dump Review</h3>

              <p>
                Let's clear your mind before
                the next session.
              </p>
            </div>

          </div>


          {urgentBrainDumps.length === 0 ? (

            /* No urgent thoughts */
            <div className="review-empty">

              <div className="review-empty-icon">
                🌿
              </div>

              <strong>
                No urgent thoughts
              </strong>

              <span>
                Your mind stayed focused.
                Keep going!
              </span>

            </div>

          ) : (

            /* Urgent thoughts */
            <div className="urgent-review">

              <div className="urgent-review-heading">

                <span>
                  🔴 Needs your attention
                </span>

                <strong>
                  {urgentBrainDumps.length}
                </strong>

              </div>


              <div className="urgent-review-list">

                {urgentBrainDumps.map(
                  (brainDump) => (

                    <div
                      className="urgent-review-item"
                      key={brainDump.id}
                    >

                      <div className="urgent-thought">

                        <span className="urgent-dot">
                          🔴
                        </span>

                        <span>
                          {brainDump.text}
                        </span>

                      </div>


                      <div className="urgent-actions">

                        <button
                          className="review-convert-button"
                          onClick={() =>
                            onConvertToTask(brainDump)
                          }
                        >
                          ✓ Task
                        </button>

                        <button
                          className="review-dismiss-button"
                          onClick={() =>
                            onDeleteBrainDump(
                              brainDump.id
                            )
                          }
                        >
                          Dismiss
                        </button>

                      </div>

                    </div>

                  )
                )}

              </div>

            </div>
          )}

        </div>


        {/* Footer */}
        <div className="focus-review-footer">

          <p>
            Take a breath. Then decide what's next.
          </p>

          <button
            className="start-break-button"
            onClick={onClose}
          >
            Start Break
            <span>→</span>
          </button>

        </div>

      </div>
    </div>
  );
}

export default FocusReview;