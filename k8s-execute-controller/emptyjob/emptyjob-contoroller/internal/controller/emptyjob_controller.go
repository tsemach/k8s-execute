/*
Copyright 2023.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

package controller

import (
	"context"

	batchv1 "k8s.io/api/batch/v1"
	corev1 "k8s.io/api/core/v1"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/runtime"
	ctrl "sigs.k8s.io/controller-runtime"
	"sigs.k8s.io/controller-runtime/pkg/client"

	"sigs.k8s.io/controller-runtime/pkg/log"

	tsemachorgv1 "tsemach.org/v2/api/v1"
)

// EmptyJobReconciler reconciles a EmptyJob object
type EmptyJobReconciler struct {
	client.Client
	Scheme *runtime.Scheme
}

//+kubebuilder:rbac:groups=tsemach.org.my.domain,resources=emptyjobs,verbs=get;list;watch;create;update;patch;delete
//+kubebuilder:rbac:groups=tsemach.org.my.domain,resources=emptyjobs/status,verbs=get;update;patch
//+kubebuilder:rbac:groups=tsemach.org.my.domain,resources=emptyjobs/finalizers,verbs=update

// Reconcile is part of the main kubernetes reconciliation loop which aims to
// move the current state of the cluster closer to the desired state.
// TODO(user): Modify the Reconcile function to compare the state specified by
// the EmptyJob object against the actual cluster state, and then
// perform operations to make the cluster state reflect the state specified by
// the user.
//
// For more details, check Reconcile and its Result here:
// - https://pkg.go.dev/sigs.k8s.io/controller-runtime@v0.16.3/pkg/reconcile
func (r *EmptyJobReconciler) Reconcile(ctx context.Context, req ctrl.Request) (ctrl.Result, error) {
	_ = log.FromContext(ctx)

	log.Log.Info("RECONCILE CALLED")
	var emptyJob tsemachorgv1.EmptyJob
	if err := r.Get(ctx, req.NamespacedName, &emptyJob); err != nil {
		log.Log.Error(err, "unable to fetch PdfDocument")
		return ctrl.Result{}, client.IgnoreNotFound(err)
	}

	jobSpec, err := r.createJob(emptyJob)
	if err != nil {
		log.Log.Error(err, "failed to create job spec")
		return ctrl.Result{}, client.IgnoreNotFound(err)
	}

	if err := r.Create(ctx, &jobSpec); err != nil {
		log.Log.Error(err, "unable to create job")
	}

	return ctrl.Result{}, nil
}

func (r *EmptyJobReconciler) createJob(emptyJob tsemachorgv1.EmptyJob) (batchv1.Job, error) {
	j := batchv1.Job{
		TypeMeta: metav1.TypeMeta{APIVersion: batchv1.SchemeGroupVersion.String(), Kind: "job"},
		ObjectMeta: metav1.ObjectMeta{
			Name:      emptyJob.Name + "-job",
			Namespace: emptyJob.Namespace,
		},
		Spec: batchv1.JobSpec{
			Template: corev1.PodTemplateSpec{
				Spec: corev1.PodSpec{
					RestartPolicy: corev1.RestartPolicyOnFailure,
					Containers: []corev1.Container{
						{
							Name:    "main",
							Image:   "alpine",
							Command: []string{"sh", "-c", "while echo I am empty job; do sleep 2; done"},
						},
					},
				},
			},
		},
	}

	return j, nil
}

// SetupWithManager sets up the controller with the Manager.
func (r *EmptyJobReconciler) SetupWithManager(mgr ctrl.Manager) error {
	return ctrl.NewControllerManagedBy(mgr).
		For(&tsemachorgv1.EmptyJob{}).
		Complete(r)
}
