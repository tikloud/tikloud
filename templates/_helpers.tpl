{{/*
Expand the name of the chart.
*/}}
{{- define "tikloud.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Create a default fully qualified app name.
We truncate at 63 chars because some Kubernetes name fields are limited to this (by the DNS naming spec).
If release name contains chart name it will be used as a full name.
*/}}
{{- define "tikloud.fullname" -}}
{{- if .Values.fullnameOverride }}
{{- .Values.fullnameOverride | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- $name := default .Chart.Name .Values.nameOverride }}
{{- if contains $name .Release.Name }}
{{- .Release.Name | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- printf "%s-%s" .Release.Name $name | trunc 63 | trimSuffix "-" }}
{{- end }}
{{- end }}
{{- end }}

{{/*
Create chart name and version as used by the chart label.
*/}}
{{- define "tikloud.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Common labels
*/}}
{{- define "tikloud.labels" -}}
helm.sh/chart: {{ include "tikloud.chart" . }}
{{ include "tikloud.selectorLabels" . }}
{{- if .Chart.AppVersion }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
{{- end }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end }}

{{/*
Selector labels
*/}}
{{- define "tikloud.selectorLabels" -}}
app.kubernetes.io/name: {{ include "tikloud.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}

{{/*
Create the name of the service account to use
*/}}
{{- define "tikloud.serviceAccountName" -}}
{{- if .Values.serviceAccount.create }}
{{- default (include "tikloud.fullname" .) .Values.serviceAccount.name }}
{{- else }}
{{- default "default" .Values.serviceAccount.name }}
{{- end }}
{{- end }}

{{/*
Create a default fully qualified name for a service in the services list.
Expects a dict with keys "root" (the chart context) and "service" (the service map).
*/}}
{{- define "tikloud.serviceFullname" -}}
{{- $ := index . "root" }}
{{- $service := index . "service" }}
{{- printf "%s-%s" (include "tikloud.fullname" $) $service.name | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Selector labels for a service in the services list.
Expects a dict with keys "root" and "service".
*/}}
{{- define "tikloud.serviceSelectorLabels" -}}
{{- $ := index . "root" -}}
{{- $service := index . "service" -}}
app.kubernetes.io/name: {{ $service.name | default $.Chart.Name }}
app.kubernetes.io/instance: {{ $.Release.Name }}
{{- end }}

{{/*
Common labels for a service in the services list.
Expects a dict with keys "root" and "service".
*/}}
{{- define "tikloud.serviceLabels" -}}
{{- $ := index . "root" -}}
{{- $service := index . "service" -}}
helm.sh/chart: {{ include "tikloud.chart" $ }}
{{ include "tikloud.serviceSelectorLabels" . }}
{{- if $.Chart.AppVersion }}
app.kubernetes.io/version: {{ $.Chart.AppVersion | quote }}
{{- end }}
app.kubernetes.io/managed-by: {{ $.Release.Service }}
app.kubernetes.io/component: {{ $service.name }}
{{- end }}

{{/*
Resolve the fully qualified image for a service in the services list.
Expects a dict with keys "root" and "service".
*/}}
{{- define "tikloud.serviceImage" -}}
{{- $ := index . "root" }}
{{- $service := index . "service" }}
{{- $image := $service.image | default dict }}
{{- $repo := $image.repository | default (printf "%s/%s" $.Values.image.repository $service.name) }}
{{- $tag := $image.tag | default $.Values.image.tag | default $.Chart.AppVersion }}
{{- printf "%s:%s" $repo $tag }}
{{- end }}

{{/*
Create a default fully qualified name for the Postgres instance.
*/}}
{{- define "tikloud.postgresFullname" -}}
{{- printf "%s-%s" (include "tikloud.fullname" .) "postgres" | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Selector labels for the Postgres instance.
*/}}
{{- define "tikloud.postgresSelectorLabels" -}}
app.kubernetes.io/name: postgres
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}

{{/*
Common labels for the Postgres instance.
*/}}
{{- define "tikloud.postgresLabels" -}}
helm.sh/chart: {{ include "tikloud.chart" . }}
{{ include "tikloud.postgresSelectorLabels" . }}
{{- if .Chart.AppVersion }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
{{- end }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
app.kubernetes.io/component: postgres
{{- end }}

{{/*
Name of the Secret holding the Postgres password.
*/}}
{{- define "tikloud.postgresSecretName" -}}
{{- default (default (include "tikloud.postgresFullname" .) .Values.postgres.auth.secretName) .Values.postgres.auth.existingSecret }}
{{- end }}
