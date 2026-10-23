# Add An Approval Step Before Risky Actions

In this course, you'll learn what approval steps are, why they matter, and how to add them to your workflows. This course is for COMPANY admins who build workflows.

Let's dive in.

## Why approval steps matter

An approval step isn't a delay, it's a safety net. Workflows run fast — which is great until one runs on the wrong data. One bad run. Hundreds of disabled accounts. No undo.

It's important to note that approval steps leverage COMPANY's seamless notification engine, ensuring the right person always sees the request.

## Add the step

1. Open the workflow in the builder.
2. Click the **+** between the trigger and the action you want to protect.
3. Choose **Approval** from the step list.
4. In **Approvers**, pick the appropriate group.
5. In **Timeout**, choose what happens if nobody responds within the time limit: **Cancel run** or **Continue anyway**.

For anything destructive, pick **Cancel run**. A workflow that continues anyway after a timeout is the same as having no approval step.

[Screenshot: add screenshot here]

## Test it

Now that you've added the step, it's time to test it. Testing isn't optional, it's how you know the approval works.

Utilize a test user to run the workflow. The approver gets a notification in Slack and email. Click **Approve** and confirm the action ran. Then run it again and let it time out to confirm the run cancels.

With these steps, you're ready to take your automation safety to the next level.
