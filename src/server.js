import grpc from '@grpc/grpc-js'
import protoLoader from '@grpc/proto-loader'

import path from 'path'
import { fileURLToPath } from 'url'

// tái tạo __dirname
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const PROTO_PATH = path.join(__dirname, 'proto', 'patient.proto')

// Load proto
const packageDef = protoLoader.loadSync(PROTO_PATH, {})
const patientProto = grpc.loadPackageDefinition(packageDef).patient


// Mock data
const patients = {
  '1': { id: '1', name: 'Duc', age: 25 },
  '2': { id: '2', name: 'Sang', age: 21 }
}

function getPatient(call, callback) {
  const patient = patients[call.request.id]

  if (patient) {
    callback(null, patient)
  } else {
    callback({
      code: grpc.status.NOT_FOUND,
      message: 'not found'
    })
  }
}

function main() {
  const server = new grpc.Server()
  server.addService(patientProto.PatientService.service, {
    GetPatient: getPatient
  })

  server.bindAsync('0.0.0.0:8001', grpc.ServerCredentials.createInsecure(), () => {
    console.log('Patient service is running on localhost:8001')
    server.start()
  })
}

main()